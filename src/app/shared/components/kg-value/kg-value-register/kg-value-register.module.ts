import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KgValueRoutingModule } from '../kg-value-routing.module';
import { KgValueRegisterComponent } from './kg-value-register.component';
import { KgValueRegisterRoutingModule } from './kg-value-register-routing.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';






@NgModule({
  declarations: [KgValueRegisterComponent],
  imports: [
    CommonModule,
    KgValueRegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  exports:[KgValueRegisterComponent],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  
  ]
})
export class KgValueRegisterModule { }
