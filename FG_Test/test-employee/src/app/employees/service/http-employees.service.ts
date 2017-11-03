import { Observable } from 'rxjs/Rx';
import { Api } from '../../api';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee';
import { EmployeesService } from './employees.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpEmployeesService implements EmployeesService {

    constructor(private httpClient: HttpClient, private api: Api) {
    }

    getAll(): Observable<Employee[]> {
        return this.httpClient
            .get<Employee[]>(this.api.employees)
    }

    save(book: Employee): Observable<any> {
        return this.httpClient
            .post<void>(this.api.employees, book)
    }

    update(book: Employee): Observable<any> {
        return this.httpClient
            .put<void>(`${this.api.employees}/${book.id}`, book)
    }

    getById(id: number): Observable<Employee> {
        return this.httpClient
            .get<Employee>(`${this.api.employees}/${id}`)
    }

    delete(id: number): Observable<any> {
      return this.httpClient
          .delete<Employee>(`${this.api.employees}/${id}`)
    }
}
