import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalReferenceListComponent } from './personal-reference-list/personal-reference-list.component';
import { SharedModule } from '../../shared.module';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PersonalReferenceListComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[PersonalReferenceListComponent]
})
export class PersonalReferenceModule { }
