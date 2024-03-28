import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityService } from './services/entity.service';
import { MockEntityService } from './services/mock-entity.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: EntityService,
      useClass: MockEntityService,
    },
  ],
})
export class EntitiesDataRepositoryModule {}
