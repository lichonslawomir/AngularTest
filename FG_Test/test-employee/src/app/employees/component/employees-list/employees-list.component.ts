import { Employee } from '../../model/employee';
import { Observable } from 'rxjs/Rx';
import { EmployeesService, EventChangeArgument } from '../../service/employees.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Observable<Employee[]>
  private sub: any

  constructor(@Inject("EmployeesService") private employeesService: EmployeesService) {
    this.employees = employeesService.getAll()
  }

  ngOnInit() {
    this.sub = this.employeesService.onItemChange.subscribe((args: EventChangeArgument) => {
      this.employees = this.employeesService.getAll()
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
