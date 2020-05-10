import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DataTablesModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
    
  ],
  exports:[CustomerListComponent]
})
export class CustomerModule { }
