import { GetTypePipe } from './pipe/get-type.pipe';
import { EmailValidator } from './validator/email.validator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EmailValidator,
    GetTypePipe
  ],
  exports: [
    EmailValidator,
    GetTypePipe
  ]
})
export class SharedModule { }
