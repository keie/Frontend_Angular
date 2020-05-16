import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalReferenceRegisterComponent } from './personal-reference-register.component';
import { PersonalReferenceRegisterRoutingModule } from './personal-reference-register-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';




@NgModule({
  declarations: [PersonalReferenceRegisterComponent],
  imports: [
    CommonModule,
    PersonalReferenceRegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  exports:[PersonalReferenceRegisterComponent,FormsModule],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  
  ]
})
export class PersonalReferenceRegisterModule { }
