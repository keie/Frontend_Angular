import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KgValueListComponent } from './kg-value-list/kg-value-list.component';
import { KgValueRoutingModule } from './kg-value-routing.module';
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { KgValueRegisterComponent } from './kg-value-register/kg-value-register.component';



@NgModule({
  declarations: [KgValueListComponent],
  imports: [
    CommonModule,
    KgValueRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[KgValueListComponent]
})
export class KgValueModule { }
