import { EmployeesResolver } from './employees-resolver';
import { routerModule } from './employees.routing';
import { HttpEmployeesService } from './service/http-employees.service';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from './model/employee';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './component/employee-form/employee-form.component';
import { EmployeesListComponent } from './component/employees-list/employees-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routerModule
  ],
  declarations: [
    EmployeeFormComponent,
    EmployeesListComponent,
  ],
  exports: [
    EmployeesListComponent
  ],
  providers: [
    EmployeesResolver,
    { provide: 'EmployeesService', useClass: HttpEmployeesService }
  ]
})
export class EmployeesModule { }
