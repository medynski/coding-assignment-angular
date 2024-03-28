import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  Employee,
  EntityDetails,
  EntityListItem,
  EntityType,
  EntityUpdateDto,
  GetEntityListParams,
  LocationStats,
} from '../model/model';
import { delayedResponse } from '../utils/delayedResponse';

@Injectable()
export class MockEntityService {
  entities: EntityDetails[] = [
    {
      entityId: '1',
      trackingId: 'ab:cd:ef:5d:7a',
      name: 'Entity 1',
      entityType: 'n1t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '2',
      trackingId: 'ac:cd:ef:4d:7a',
      name: 'Entity 2',
      entityType: 'n1t',
      entityStatus: 'Break',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '3',
      trackingId: 'af:cd:ef:5d:8a',
      name: 'Entity 3',
      entityType: 'n2t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '4',
      trackingId: 'af:cf:ef:5d:9a',
      name: 'Entity 4',
      entityType: 'n2t',
      entityStatus: 'Break',
      isActive: false,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
  ];

  entityTypes: EntityType[] = [
    { id: 'n1t', name: 'Nurse' },
    { id: 'n2t', name: 'Security' },
  ];

  lastWeekLocationOccupancy: number[] = [40, 245, 235, 182, 143, 120, 20];

  lastWeekVisitsLog: Employee[] = [
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id5', name: 'Rachel Gray' },
    { id: 'id6', name: 'Alexis Morales' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id1', name: 'Jacob Holland' },
  ];

  getEntityList({
    search,
    name,
  }: GetEntityListParams): Observable<EntityListItem[]> {
    return of(
      this.entities.filter((entity) => {
        const conditionTrackingId = search
          ? entity.trackingId?.includes(search)
          : true;
        const conditionName = name ? entity.name.includes(name) : true;
        return conditionTrackingId && conditionName;
      }),
    ).pipe(delayedResponse());
  }

  getEntityDetails(entityId: string): Observable<EntityDetails> {
    const entity = this.entities.find((entity) => entity.entityId === entityId);
    const output: Observable<EntityDetails> = entity
      ? of(entity)
      : throwError(() => new HttpErrorResponse({ status: 404 }));

    return output.pipe(delayedResponse());
  }

  updateEntity(
    entityUpdateDto: EntityUpdateDto,
    entityId: string,
  ): Observable<EntityDetails> {
    const entity = this.entities.find((entity) => entity.entityId === entityId);
    const output: Observable<EntityDetails> = entity
      ? of({ ...entity, ...entityUpdateDto })
      : throwError(() => new HttpErrorResponse({ status: 404 }));

    return output.pipe(delayedResponse());
  }

  getEntityTypes(): Observable<EntityType[]> {
    return of(this.entityTypes).pipe(delayedResponse());
  }

  getLocationStats(): Observable<LocationStats> {
    return of({
      lastWeekLocationOccupancy: [],
      lastWeekEmployeesVisits: [],
    }).pipe(delayedResponse());
  }
}
