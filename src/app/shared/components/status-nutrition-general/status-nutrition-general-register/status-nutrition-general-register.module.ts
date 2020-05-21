import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusNutritionGeneralRegisterComponent } from './status-nutrition-general-register.component';
import { RouterModule } from '@angular/router';
import { StatusNutritionGeneralRegisterRoutingModule } from './status-nutrition-general-register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@NgModule({
  declarations: [StatusNutritionGeneralRegisterComponent],
  imports: [
    CommonModule,
    StatusNutritionGeneralRegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  exports:[StatusNutritionGeneralRegisterComponent],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  
  ]
})
export class StatusNutritionGeneralRegisterModule { }
