import { ArrayEmployeesService } from './service/array-employees.service';
import { routerModule } from './employees.routing';
import { HttpEmployeesService } from './service/http-employees.service';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from './model/employee';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './component/employee-form/employee-form.component';
import { EmployeesListComponent } from './component/employees-list/employees-list.component';
import { SharedModule } from '../shared/shared.module';
import employeesData from './model/employee.data'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routerModule,
    SharedModule
  ],
  declarations: [
    EmployeeFormComponent,
    EmployeesListComponent,
  ],
  exports: [
    EmployeesListComponent
  ],
  providers: [
    { provide: 'EmployeesService', useClass: ArrayEmployeesService },
    { provide: 'DummyEmployeesData', useValue: employeesData }
  ]
})
export class EmployeesModule { }
