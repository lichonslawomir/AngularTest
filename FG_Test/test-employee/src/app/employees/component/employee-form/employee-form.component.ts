import { EmployeesService } from '../../service/employees.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Employee } from '../../model/employee';
import { Component, Inject, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee = new Employee()
  newEntity:boolean = true
  editable :boolean= false
  private sub: any

  constructor(private route: ActivatedRoute, @Inject('EmployeesService') private employeesService: EmployeesService) {
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      if(params.id) {
        this.newEntity = false
        this.editable = false
        this.employeesService.getById(+params.id).subscribe( e => {
          this.employee = Object.assign({}, e)
        });
      } else {
        this.employee = new Employee()
        this.editable = true
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save(employeeForm) {
    if (this.editable && employeeForm.valid) {
      if(this.newEntity) {
        this.employeesService.save(this.employee).subscribe(() => {
          this.editable = false
        })
      } else {
        this.employeesService.update(this.employee).subscribe(() => {
          this.editable = false
        })
      }
    }
  }
}
