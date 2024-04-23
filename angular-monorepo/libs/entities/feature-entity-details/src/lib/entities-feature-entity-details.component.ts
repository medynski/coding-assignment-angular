import {
  EntityDetails,
  EntityService,
  EntityType,
  handleError,
  Nullable,
} from '@angular-monorepo/entities/data-repository';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { firstValueFrom, forkJoin, switchMap } from 'rxjs';
import { EntityTypePipe } from '../pipes/entityType.pipe';
import { matchFieldsValidator } from '../validators/matchFields.validator';
import { nameValidator } from '../validators/name.validator';

@Component({
  selector: 'lib-entities-feature-entity-details',
  template: `<main>
    <div>
      <a
        routerLink="/entity/list"
        alt="back to the list"
        class="font-medium text-blue-600  hover:underline hover:cursor-pointer"
        ><i class="pi pi-arrow-left mr-2.5"></i>Back to the list</a
      >
    </div>
    <p-messages></p-messages>

    <div class="flex flex-col divide-y mt-5" [formGroup]="formGroup">
      <div class="py-2.5">
        <div class="font-bold">Tracking ID:</div>
        @if (editMode()) {
          <div>
            <input
              class="border rounded border-solid p-2.5 w-[200px]"
              type="text"
              formControlName="trackingId"
            />
            @if (formGroup.controls.trackingId.errors) {
              <div class="text-red-500 text-xs">Invalid value</div>
            }
          </div>
        } @else {
          <div>{{ data()?.entityDetails?.trackingId }}</div>
        }
      </div>
      <div class="py-2.5">
        <div class="font-bold">Name:</div>
        @if (editMode()) {
          <div>
            <input
              class="border rounded border-solid p-2.5 w-[200px]"
              type="text"
              formControlName="name"
            />
            @if (formGroup.controls.name.getError('required')) {
              <div class="text-red-500 text-xs">This field is required</div>
            } @else if (
              formGroup.controls.name.getError('entityAlreadyExists')
            ) {
              <div class="text-red-500 text-xs">Name already exists</div>
            } @else if (formGroup.getError('fieldsMatch')) {
              <div class="text-red-500 text-xs">
                Name must be different than tracking id
              </div>
            }
          </div>
        } @else {
          <div>{{ data()?.entityDetails?.name }}</div>
        }
      </div>
      <div class="py-2.5">
        <div class="font-bold">EntityType:</div>
        @if (editMode()) {
          <div>
            <select
              class="border rounded border-solid p-2.5 w-[200px]"
              formControlName="entityType"
            >
              @for (type of data()?.entityTypes; track type.id) {
                <option [value]="type.id">{{ type.name }}</option>
              }
            </select>
          </div>
        } @else {
          <div>
            {{
              data()?.entityDetails?.entityType || ''
                | entityType: data()?.entityTypes || []
            }}
          </div>
        }
      </div>
      <div class="py-2.5">
        <div class="font-bold">EntityStatus:</div>
        <div>{{ data()?.entityDetails?.entityStatus }}</div>
      </div>
      <div class="py-2.5">
        <div class="font-bold">Is Active:</div>
        <div>{{ data()?.entityDetails?.isActive }}</div>
      </div>
      <div class="py-2.5">
        <div class="font-bold">Attributes:</div>
        <div>{{ data()?.entityDetails?.attributes?.join(' | ') }}</div>
      </div>
      <div class="py-2.5">
        @if (editMode()) {
          <button
            class="font-medium text-green-600  hover:underline hover:cursor-pointer disabled:text-gray-500 disabled:cursor-not-allowed"
            (click)="save()"
            [disabled]="!formGroup.touched || formGroup.invalid"
          >
            Save
          </button>
        } @else {
          <button
            class="font-medium text-blue-600  hover:underline hover:cursor-pointer"
            (click)="switchToEditMode()"
          >
            Edit
          </button>
        }
      </div>
    </div>
  </main>`,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    EntityTypePipe,
    MessagesModule,
  ],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesFeatureEntityDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly entityService = inject(EntityService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  readonly editMode = signal(false);

  readonly data = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) =>
        forkJoin({
          entityDetails: this.entityService
            .getEntityDetails(id)
            .pipe(handleError<Nullable<EntityDetails>>(null)),
          entityTypes: this.entityService
            .getEntityTypes()
            .pipe(handleError<Nullable<EntityType[]>>(null)),
        }),
      ),
    ),
    { initialValue: null },
  );

  private readonly initialName = computed(
    () => this.data()?.entityDetails?.name || '',
  );

  formGroup = new FormGroup(
    {
      trackingId: new FormControl<string>('', Validators.required),
      name: new FormControl<string>(
        '',
        Validators.required,
        nameValidator(this.entityService, this.initialName),
      ),
      entityType: new FormControl<string>('', Validators.required),
    },
    { validators: matchFieldsValidator('trackingId', 'name') },
  );

  switchToEditMode() {
    const data = this.data();
    if (data && data.entityDetails && data.entityTypes) {
      this.formGroup.controls.trackingId.setValue(
        data.entityDetails.trackingId || '',
      );
      this.formGroup.controls.name.setValue(data.entityDetails.name || '');
      this.formGroup.controls.entityType.setValue(
        data.entityDetails.entityType || '',
      );
    }

    this.editMode.set(true);
  }

  save() {
    const { trackingId, name, entityType } = this.formGroup.value;
    const data = this.data();
    const entity = data?.entityDetails;

    if (data && entity) {
      this.editMode.set(false);
      firstValueFrom(
        this.entityService.updateEntity(
          {
            trackingId: trackingId || undefined,
            name: name || entity.name,
            entityType: entityType || entity.entityType || '',
          },
          entity.entityId,
        ),
      )
        .then((response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Save request has been proceed successfully.',
          });
          // @todo: update data stream (entityDetails) with a newly created object
          console.info('Data to update: ', { response });
        })
        .catch(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error Message',
            detail: 'Something went wrong.',
          });
          setTimeout(() => this.router.navigateByUrl('/entity/list'), 2000);
        });
    }
  }
}
