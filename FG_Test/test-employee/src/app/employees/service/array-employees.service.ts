import { Observable } from 'rxjs/Rx';
import { EventEmitter, Inject, Injectable, Optional } from '@angular/core';
import { Employee } from '../model/employee';
import { ChangeType, EmployeesService, EventChangeArgument } from './employees.service';

@Injectable()
export class ArrayEmployeesService implements EmployeesService {

    constructor(@Optional() @Inject('EmployeesData') private employees: Employee[] = []) {
    }

    onItemChange = new EventEmitter<EventChangeArgument>()

    getAll(): Observable<Employee[]> {
        return Observable.of(this.employees);
    }

    save(employee: Employee): Observable<any> {
      return Observable.create((observer) => {
        if(this.employees.length > 0)
          employee.id = Math.max(...this.employees.map(e => e.id)) +1
        else
          employee.id = 1
        this.employees.push(employee)
        observer.next();
        this.onItemChange.emit(new EventChangeArgument(ChangeType.Added, [employee]))
      })
    }

    update(employee: Employee): Observable<any> {
      return Observable.create((observer) => {
        let index = this.findIndex(employee.id)
        var obsResult = Observable.empty()
        if (index !== -1) {
          this.employees[index] = employee
        }
        observer.next();
        this.onItemChange.emit(new EventChangeArgument(ChangeType.Updated, [employee]))
      })
    }

    private findIndex(id: number): number {
      return this.employees
          .findIndex(e => id === e.id)
    }

    getById(id: number): Observable<Employee> {
      let index = this.findIndex(id)
        if (index !== -1) {
          return Observable.from([this.employees[index]]);
        }
        return Observable.empty()
    }

    delete(employee: Employee): Observable<any> {
      return Observable.create((observer) => {
        let index = this.findIndex(employee.id)
        var obsResult = Observable.empty()
        if (index !== -1) {
          this.employees.splice(index,1)
        }
        observer.next();
        this.onItemChange.emit(new EventChangeArgument(ChangeType.Deleted, [employee]))
      })
    }

}
