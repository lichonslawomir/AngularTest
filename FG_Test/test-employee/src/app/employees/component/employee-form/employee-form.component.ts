import { formTransition } from './employee-form.animation';
import { EmployeesService } from '../../service/employees.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Employee } from '../../model/employee';
import { Component, Inject, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  animations: [ formTransition ],
  host: {'[@formTransition]': ''}
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee = new Employee()
  employeeFromService: Employee
  employeeEdited: Employee
  newEntity:boolean = true
  editable :boolean= false
  private sub: any

  constructor(private route: ActivatedRoute, private router: Router, @Inject('EmployeesService') private employeesService: EmployeesService) {
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      if(params.id) {
        this.newEntity = false
        this.editable = false
        this.employeesService.getById(+params.id).subscribe( e => {
          this.employeeFromService = e
          this.employeeEdited = Object.assign({}, this.employeeFromService)
          this.employee = this.employeeFromService
        });
      } else {
        this.employeeEdited = new Employee()
        this.employee = this.employeeEdited
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
        this.employeesService.save(this.employee).subscribe((e) => {
          this.router.navigateByUrl(`employees/${e.id}`)
        })
      } else {
        this.employeesService.update(this.employee).subscribe(() => {
          this.editable = false
          Object.assign(this.employeeFromService, this.employee)
          this.router.navigateByUrl('employees')
        })
      }
    }
  }
  edit() {
    if(!this.newEntity) {
      this.employee = this.employeeEdited
      this.editable = true
    }
  }
  cancel() {
    if(this.newEntity) {
      this.router.navigateByUrl('employees')
    } else {
      this.editable = false
      this.employee = this.employeeFromService
    }
  }
}
