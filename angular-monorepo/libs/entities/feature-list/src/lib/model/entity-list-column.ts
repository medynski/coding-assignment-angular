import { EntityListItem } from "@angular-monorepo/entities/data-repository";

export type EntityListColumn = {
    value: keyof EntityListItem;
    label: string;
};

export const columns: EntityListColumn[] = [
    { value: 'trackingId', label: 'Tracking ID' },
    { value: 'name', label: 'Name' },
    { value: 'entityType', label: 'Entity Type' },
    { value: 'entityStatus', label: 'Entity Status' },
    { value: 'isActive', label: 'Is Active' },
  ];