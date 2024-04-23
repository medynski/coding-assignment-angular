import {
  EntityListItem,
  Nullable,
} from '@angular-monorepo/entities/data-repository';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { columns, EntityListColumn } from './../model/entity-list-column';

@Component({
  selector: 'angular-monorepo-entities-feature-list-entries',
  template: `
    <div class="relative overflow-x-auto shadow-md sm:rounded border">
      <table class="w-full text-sm text-left text-gray-500">
        @for (entity of entities; track entity.entityId; let first = $first) {
          @if (first) {
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                @for (column of visibleColumns; track column.value) {
                  <th class="px-6 py-3">{{ column.label }}</th>
                }
                @if (visibleColumns?.length) {
                  <th>Actions</th>
                }
              </tr>
            </thead>
          }
          <tr class="bg-white border-b">
            @for (column of visibleColumns; track column.value) {
              @if (column.value === 'isActive') {
                <td class="px-6 py-4">
                  {{ entity.isActive }}
                  @if (!entity.isActive) {
                    <i class="pi pi-exclamation-triangle text-red-500"></i>
                    inactive
                  }
                </td>
              } @else {
                <td class="px-6 py-4">
                  {{ entity[column.value] }}
                </td>
              }
            }
            @if (visibleColumns?.length) {
              <td class="px-6 py-4">
                <div
                  [routerLink]="['./../detail', entity.entityId]"
                  class="font-medium text-blue-600  hover:underline hover:cursor-pointer"
                >
                  Edit
                </div>
              </td>
            }
          </tr>
        } @empty {
          <tr>
            <td class="p-2.5">There are no items.</td>
          </tr>
        }
      </table>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesFeatureListEntriesComponent {
  readonly columns = columns;
  @Input() entities: Nullable<EntityListItem[]> = null;
  @Input() visibleColumns: Nullable<EntityListColumn[]> = null;
}
