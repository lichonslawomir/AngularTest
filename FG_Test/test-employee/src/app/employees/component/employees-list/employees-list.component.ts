import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../model/employee';
import { Observable } from 'rxjs/Rx';
import { EmployeesService } from '../../service/employees.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent {

  employees: Observable<Employee[]>

  constructor( @Inject("EmployeesService") employeesService: EmployeesService, route: ActivatedRoute) {
    //var t = new Employee();
    //t.forename = 'ss';
    //var ttt:Employee[] = [t]
    //this.employees = Observable.of(ttt);    
    this.employees = employeesService.getAll()
    //console.log(this.employees)
  }

}
