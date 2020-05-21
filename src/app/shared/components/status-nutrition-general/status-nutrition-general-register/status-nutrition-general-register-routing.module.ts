import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StatusNutritionGeneralRegisterComponent } from './status-nutrition-general-register.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Roles } from 'src/app/auth/roles.enum';

const statusNutritionGeneralRegisterRoutes:Routes=[
  {
    path:'',
    component:StatusNutritionGeneralRegisterComponent,
    pathMatch:'full',
    canLoad:[AuthGuard],
    data:{
      expectedRole:Roles.admin
    }
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(statusNutritionGeneralRegisterRoutes)
  ],
  exports:[RouterModule]
})
export class StatusNutritionGeneralRegisterRoutingModule { }
