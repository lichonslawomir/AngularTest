import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Employee } from '../../model/employee';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {

  @Input()
  employee: Employee
  @Output('save')
  onSave = new EventEmitter()
  @Output('cancel')
  onCancel = new EventEmitter()

  editable = true

  constructor(private route: ActivatedRoute, router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let employee = this.route.snapshot.data.employee
        this.editable = false
        this.employee = employee || new Employee()
      }
    })
  }

  save(employeeForm) {
    if (employeeForm.valid) {
      this.onSave.emit(this.employee)
    }
  }

}
