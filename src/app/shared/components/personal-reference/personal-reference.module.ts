import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalReferenceListComponent } from './personal-reference-list/personal-reference-list.component';
import { SharedModule } from '../../shared.module';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PersonalReferenceRoutingModule } from './personal-reference-routing.module';




@NgModule({
  declarations: [PersonalReferenceListComponent],
  imports: [
    CommonModule,
    PersonalReferenceRoutingModule,
    SharedModule,
    DataTablesModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
    
    
  ],
  exports:[PersonalReferenceListComponent]
})
export class PersonalReferenceModule { }
