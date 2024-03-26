import { Injectable } from '@angular/core';
import { EntityDetails, EntityListItem, EntityType, EntityUpdateDto, GetEntityListParams, LocationStats } from "../model/model";
import { Observable, of } from 'rxjs';

@Injectable()
export class EntityService {

    getEntityList(getEntityListParams: GetEntityListParams): Observable<EntityListItem[]> {
        return of([]);
    }

    getEntityDetails(entityId: string): Observable<EntityDetails> {
        return of({
            entityId: '',
            trackingId: '',
            name: '',
            entityType: '',
            entityStatus: '',
            isActive: false,
            attributes: [],
        });
    }

    updateEntity(entityUpdateDto: EntityUpdateDto, entityId: string): Observable<EntityDetails> {
        return of({
            entityId: '',
            trackingId: '',
            name: '',
            entityType: '',
            entityStatus: '',
            isActive: false,
            attributes: [],
        });
    }

    getEntityTypes(): Observable<EntityType[]> {
        return of([]);
    }

    getLocationStats(): Observable<LocationStats> {
        return of({
            lastWeekLocationOccupancy: [],
            lastWeekEmployeesVisits: [],
        });
    }
}