import { EmailValidator } from './validator/email.validator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EmailValidator
  ],
  exports: [
    EmailValidator
  ]
})
export class SharedModule { }
