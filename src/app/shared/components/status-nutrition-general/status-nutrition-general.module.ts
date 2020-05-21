import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusNutritionGeneralListComponent } from './status-nutrition-general-list/status-nutrition-general-list.component';
import { StatusNutritionGeneralRoutingModule } from './status-nutrition-general-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { StatusNutritionGeneralRegisterComponent } from './status-nutrition-general-register/status-nutrition-general-register.component';



@NgModule({
  declarations: [StatusNutritionGeneralListComponent],
  imports: [
    CommonModule,
    StatusNutritionGeneralRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[StatusNutritionGeneralListComponent]
})
export class StatusNutritionGeneralModule { }
