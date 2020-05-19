import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SizeValueRegisterRoutingModule } from './size-value-register-routing.module';
import { SizeValueRegisterComponent } from './size-value-register.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@NgModule({
  declarations: [SizeValueRegisterComponent],
  imports: [
    CommonModule,
    SizeValueRegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  exports:[SizeValueRegisterComponent,FormsModule],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  
  ]
})
export class SizeValueRegisterModule { }
