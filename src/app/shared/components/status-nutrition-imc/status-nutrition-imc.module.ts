import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusNutritionImcListComponent } from './status-nutrition-imc-list/status-nutrition-imc-list.component';
import { StatusNutritionImcRoutingModule } from './status-nutrition-imc-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { StatusNutritionImcRegisterComponent } from './status-nutrition-imc-register/status-nutrition-imc-register.component';



@NgModule({
  declarations: [StatusNutritionImcListComponent],
  imports: [
    CommonModule,
    StatusNutritionImcRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[StatusNutritionImcListComponent]
})
export class StatusNutritionImcModule { }
