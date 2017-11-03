import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Api } from './api';
import { EmployeesModule } from './employees/employees.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routerModule } from './app.routing'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EmployeesModule,
    routerModule
  ],
  providers: [
    Api
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
