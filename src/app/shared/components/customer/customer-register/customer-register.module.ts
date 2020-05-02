import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRegisterComponent } from './customer-register.component';
import { CustomerRegisterRoutingModule } from './customer-register-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [CustomerRegisterComponent],
  imports: [
    CommonModule,
    CustomerRegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule
    
  ],
  exports:[CustomerRegisterComponent,FormsModule]
})
export class CustomerRegisterModule { }
