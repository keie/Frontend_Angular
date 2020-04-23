import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DataTablesModule
  ],
  exports:[CustomerListComponent]
})
export class CustomerModule { }
