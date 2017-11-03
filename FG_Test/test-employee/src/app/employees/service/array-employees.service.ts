import { Observable } from 'rxjs/Rx';
import { Inject, Injectable, Optional } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeesService } from './employees.service';

@Injectable()
export class ArrayEmployeesService implements EmployeesService {

    constructor(@Optional() @Inject('BooksData') private eployees: Employee[] = []) {
    }

    getAll(): Observable<Employee[]> {
        return Observable.of(this.eployees);
    }

    save(eployee: Employee): Observable<any> {
        if(this.eployees.length > 0)
          eployee.id = Math.max(...this.eployees.map(e => e.id)) +1
        else
          eployee.id = 1
        this.eployees.push(eployee)
        return Observable.empty()
    }

    update(eployee: Employee): Observable<any> {
        let index = this.findIndex(eployee.id)
        if (index !== -1) {
            this.eployees[index] = eployee
        }
        return Observable.empty()
    }

    private findIndex(id: number): number {
      return this.eployees
          .findIndex(e => id === e.id)
    }


    getById(id: number): Observable<Employee> {
      let index = this.findIndex(id)
        if (index !== -1) {
            return Observable.from([this.eployees[index]]);
        }
        return Observable.empty()
    }

    delete(id: number): Observable<any> {
      let index = this.findIndex(id)
      if (index !== -1) {
          this.eployees.splice(index,1)
      }
      return Observable.empty()
    }

}
