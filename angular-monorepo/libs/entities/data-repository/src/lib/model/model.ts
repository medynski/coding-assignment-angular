export interface EntityListItem {
    entityId: string;
    trackingId?: string;
    name: string;
    entityType?: string;
    entityStatus?: string;
    isActive: boolean;
}

export interface EntityDetails {
    entityId: string;
    trackingId?: string;
    name: string;
    entityType?: string;
    entityStatus?: string;
    isActive: boolean;
    attributes: string[];
}

export interface GetEntityListParams {
    // search by name and trackingId for included string
    search?: string;
    // search by name for exact match
    name?: string;
}

export interface EntityUpdateDto {
    trackingId?: string;
    name: string;
    entityType: string;
}

export interface EntityType {
    id: string;
    name: string;
}

export interface EmployeeVisits {
    name: string;
    visits: number;
}

export interface Employee {
    name: string;
    id: string;
}

export interface LocationStats {
    //occupancy (how many visitors were at specific day in the location) for last 7 days, last array item is newest data
    lastWeekLocationOccupancy: number[];
    //last week visits count per employee (top 5 Employees with most visits only)
    lastWeekEmployeesVisits: EmployeeVisits[];
}
