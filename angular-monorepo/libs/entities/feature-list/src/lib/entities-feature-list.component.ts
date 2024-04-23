import {
  EntityListItem,
  EntityService,
  handleError,
  Nullable,
} from '@angular-monorepo/entities/data-repository';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, switchMap } from 'rxjs';
import { EntitiesFeatureListEntriesComponent } from './components/entities-feature-list-entries.component';
import { EntitiesFeatureListFiltersComponent } from './components/entities-feature-list-filters.component';
import { columns, EntityListColumn } from './model/entity-list-column';

@Component({
  selector: 'angular-monorepo-entities-feature-list',
  template: `
    <main>
      <angular-monorepo-entities-feature-list-filters
        (visibleColumnsChanged)="handleColumnsVisibilityChanges($event)"
        (searchNameChanged)="handleSearchNameChanges($event)"
        (searchTrackingIdChanged)="handleSearchTrackingIdChanges($event)"
      ></angular-monorepo-entities-feature-list-filters>

      <angular-monorepo-entities-feature-list-entries
        [entities]="entities()"
        [visibleColumns]="visibleColumns()"
      ></angular-monorepo-entities-feature-list-entries>
    </main>
  `,
  standalone: true,
  imports: [
    CommonModule,
    EntitiesFeatureListFiltersComponent,
    EntitiesFeatureListEntriesComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesFeatureListComponent {
  private readonly entityService = inject(EntityService);
  private searchName = signal<Nullable<string>>(null);
  private searchTrackingId = signal<Nullable<string>>(null);

  readonly columns = columns;
  readonly visibleColumns = signal<Nullable<EntityListColumn[]>>([]);
  readonly entities = toSignal(
    combineLatest([
      toObservable(this.searchName),
      toObservable(this.searchTrackingId),
    ]).pipe(
      switchMap(([searchName, searchTrackingId]) =>
        this.entityService
          .getEntityList({
            name: searchName || '',
            search: searchTrackingId || '',
          })
          .pipe(handleError<EntityListItem[]>([])),
      ),
    ),
    { initialValue: [] },
  );

  handleColumnsVisibilityChanges(event: Nullable<EntityListColumn[]>) {
    this.visibleColumns.set(event);
  }

  handleSearchNameChanges(event: Nullable<string>) {
    this.searchName.set(event);
  }

  handleSearchTrackingIdChanges(event: Nullable<string>) {
    this.searchTrackingId.set(event);
  }
}
