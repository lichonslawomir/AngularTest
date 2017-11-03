import { Observable } from 'rxjs/Rx';
import { Employee } from '../model/employee';

export interface EmployeesService {

    getAll(): Observable<Employee[]>

    save(book: Employee): Observable<any>

    update(book: Employee): Observable<any>

    getById(id: number): Observable<Employee>

    delete(id: number): Observable<any>
}
