import { Employee, EmployeeVisits } from '../../model/model';

export function mapLastWeekEmployeesVisits(
  lastWeekVisitsLog: Employee[],
): EmployeeVisits[] {
  const visitsMap = lastWeekVisitsLog.reduce((map, employee) => {
    map.set(employee.name, (map.get(employee.name) || 0) + 1);
    return map;
  }, new Map<string, number>());

  return Array.from(visitsMap.entries(), ([name, visits]) => ({
    name,
    visits,
  }));
}
