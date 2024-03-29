import { Nullable } from '@angular-monorepo/entities/data-repository';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { columns, EntityListColumn } from '../model/entity-list-column';
import { LocalStorageService } from '../utils/local-storage.service';

const LOCAL_STORAGE_KEY = 'visibleColumns';
const DEBOUNCE_TIME = 500;

@Component({
  selector: 'angular-monorepo-entities-feature-list-filters',
  template: `
    <section class="flex flex-col lg:flex-row mb-2.5" [formGroup]="formGroup">
      <div class="flex flex-col lg:pr-2.5 lg:w-1/3 w-full mb-2.5">
        <div>Visible columns:</div>
        <p-multiSelect
          [options]="columns"
          formControlName="visibleColumns"
          optionLabel="label"
          placeholder="Select columns"
          [filter]="false"
          styleClass="border rounded border-solid w-full"
        ></p-multiSelect>
      </div>

      <div class="flex flex-col lg:px-2.5 lg:w-1/3 w-full mb-2.5">
        <div>Search by name:</div>
        <div class="border rounded border-solid h-[50px]">
          <input
            class="p-2.5 outline-none block"
            type="text"
            formControlName="searchName"
          />
        </div>
      </div>

      <div class="flex flex-col lg:pl-2.5 lg:w-1/3 w-full mb-2.5">
        <div>Search by trackingId:</div>
        <div class="border rounded border-solid h-[50px]">
          <input
            class="p-2.5 outline-none block"
            type="text"
            formControlName="searchTrackingId"
          />
        </div>
      </div>
    </section>
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MultiSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    ::ng-deep .p-checkbox-box {
      @apply border rounded border-solid;
    }
  `,
})
export class EntitiesFeatureListFiltersComponent implements OnInit {
  @Output() visibleColumnsChanged: EventEmitter<Nullable<EntityListColumn[]>> =
    new EventEmitter();

  @Output() searchNameChanged: EventEmitter<Nullable<string>> =
    new EventEmitter();

  @Output() searchTrackingIdChanged: EventEmitter<Nullable<string>> =
    new EventEmitter();

  readonly columns = columns;
  readonly formGroup = new FormGroup({
    visibleColumns: new FormControl<Nullable<EntityListColumn[]>>(null),
    searchName: new FormControl<Nullable<string>>(''),
    searchTrackingId: new FormControl<Nullable<string>>(''),
  });
  readonly destroyRef = inject(DestroyRef);
  readonly localStorageService = inject(LocalStorageService);

  ngOnInit() {
    this.setValueChangesSubscribers();
    this.updateFiltersValue();
  }

  private setValueChangesSubscribers() {
    const { visibleColumns, searchName, searchTrackingId } =
      this.formGroup.controls;

    searchName.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
      )
      .subscribe((currentValue) => {
        this.searchNameChanged.next(currentValue);
      });

    searchTrackingId.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
      )
      .subscribe((currentValue) => {
        this.searchTrackingIdChanged.next(currentValue);
      });

    visibleColumns.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((currentValue) => {
        this.localStorageService.saveData(LOCAL_STORAGE_KEY, currentValue);
        this.visibleColumnsChanged.next(currentValue);
      });
  }

  private updateFiltersValue() {
    const { visibleColumns } = this.formGroup.controls;
    const visibleColumnsValue: EntityListColumn[] =
      this.localStorageService.retrieveData(LOCAL_STORAGE_KEY) || columns;
    visibleColumns.setValue(visibleColumnsValue);
    visibleColumns.updateValueAndValidity();
  }
}
