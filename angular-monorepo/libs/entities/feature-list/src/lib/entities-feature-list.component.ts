import { EntityService } from '@angular-monorepo/entities/data-repository';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'angular-monorepo-entities-feature-list',
  template: '<div>entities list</div>',
  standalone: true,
  imports: [CommonModule],
})
export class EntitiesFeatureListComponent {
  entityService = inject(EntityService);

  constructor() {
    this.entityService
      .getEntityList({ name: '', search: '' })
      .subscribe(console.warn);
  }
}
