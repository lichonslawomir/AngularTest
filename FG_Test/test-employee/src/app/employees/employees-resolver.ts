import { EmployeesService } from './service/employees.service';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Employee } from './model/Employee';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

export class EmployeesResolver implements Resolve<Employee> {

    constructor( @Inject('EmployeesService') private employeesService: EmployeesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee> {
        return this.employeesService.getById(+route.paramMap.get('id'))
    }
}
