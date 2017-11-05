import { empty } from 'rxjs/Observer';
import { Employee } from './../model/employee';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../api';
import { HttpClient } from '@angular/common/http';
import { ChangeType, EmployeesService, EventChangeArgument } from './employees.service';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class HttpEmployeesService implements EmployeesService {

    constructor(private httpClient: HttpClient, private api: Api) {
    }

    onItemChange = new EventEmitter<EventChangeArgument>()

    getAll(): Observable<Employee[]> {
        return this.httpClient
            .get<Employee[]>(this.api.employees)
    }

    save(employee: Employee): Observable<Employee> {
      return Observable.create((observer) => {
        var obsResult = this.httpClient.post<Employee>(this.api.employees, employee)
        obsResult.subscribe(e => {
          observer.next(e);
          this.onItemChange.emit(new EventChangeArgument(ChangeType.Added, [employee]))
        },
        errorResponse => {
          observer.error(errorResponse.error)
        },
        () => observer.complete())
      })
    }

    update(employee: Employee): Observable<any> {
      return Observable.create((observer) => {
        var obsResult = this.httpClient.put<any>(`${this.api.employees}/${employee.id}`, employee)
        obsResult.subscribe(() => {
          observer.next();
          this.onItemChange.emit(new EventChangeArgument(ChangeType.Updated, [employee]))
        },
        error => {
          console.log('error')
          console.log(error)
          throw error
        },
        () => observer.complete())
      })
    }

    getById(id: number): Observable<Employee> {
        return this.httpClient
            .get<Employee>(`${this.api.employees}/${id}`)
    }

    delete(employee: Employee): Observable<any> {
      return Observable.create((observer) => {
        var obsResult = this.httpClient.delete<any>(`${this.api.employees}/${employee.id}`)
        obsResult.subscribe(() => {
          console.log('delete')
          observer.next();
          this.onItemChange.emit(new EventChangeArgument(ChangeType.Deleted, [employee]))
        })
      })
    }
}
