import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Employee } from '../model/employee';

export enum ChangeType {
    Added = 1,
    Updated,
    Deleted
}
export class EventChangeArgument
{
  constructor(public ChangeType:ChangeType, public Items:Employee[]){
  }
}
export interface EmployeesService {

    getAll(): Observable<Employee[]>

    save(employee: Employee): Observable<any>

    update(employee: Employee): Observable<any>

    getById(id: number): Observable<Employee>

    delete(employee: Employee): Observable<any>

    onItemChange: EventEmitter<EventChangeArgument>
}
