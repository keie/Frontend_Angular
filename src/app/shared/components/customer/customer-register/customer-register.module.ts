import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRegisterComponent } from './customer-register.component';
import { CustomerRegisterRoutingModule } from './customer-register-routing.module';



@NgModule({
  declarations: [CustomerRegisterComponent],
  imports: [
    CommonModule,
    CustomerRegisterRoutingModule
    
  ],
  exports:[CustomerRegisterComponent]
})
export class CustomerRegisterModule { }
