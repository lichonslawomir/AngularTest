import { FormControl, FormGroup } from '@angular/forms';
import { Employee } from '../../model/employee';
import { Observable, Subject } from 'rxjs/Rx';
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

  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject();

  constructor(@Inject("EmployeesService") private employeesService: EmployeesService) {
    this.employees = Observable.create((observer) => {
      var employeesResult = this.employeesService.getAll()
      employeesResult.subscribe((arr) => {
        observer.next(arr);
        this.dtTrigger.next()
      })
    })
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.sub = this.employeesService.onItemChange.subscribe((args: EventChangeArgument) => {
      this.employees = this.employeesService.getAll()
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
  delete(employee) {
    this.employeesService.delete(employee).subscribe(()=> {
      console.log('delete2')
    })
  }
}
