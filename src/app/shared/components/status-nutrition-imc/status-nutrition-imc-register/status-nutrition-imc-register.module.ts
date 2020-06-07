import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusNutritionImcRegisterComponent } from './status-nutrition-imc-register.component';
import { StatusNutritionGeneralRegisterRoutingModule } from '../../status-nutrition-general/status-nutrition-general-register/status-nutrition-general-register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusNutritionImcRegisterRoutingModule } from './status-nutrition-imc-register-routing.module';



@NgModule({
  declarations: [StatusNutritionImcRegisterComponent],
  imports: [
    CommonModule,
    StatusNutritionImcRegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  exports:[StatusNutritionImcRegisterComponent],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ]
})
export class StatusNutritionImcRegisterModule { }
