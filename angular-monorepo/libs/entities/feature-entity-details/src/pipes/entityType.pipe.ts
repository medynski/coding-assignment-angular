import { EntityType } from '@angular-monorepo/entities/data-repository';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'entityType',
})
export class EntityTypePipe implements PipeTransform {
  transform(value: string, types: EntityType[]): string {
    const type = types.find((type) => type.id === value);
    return type ? type.name : value;
  }
}
