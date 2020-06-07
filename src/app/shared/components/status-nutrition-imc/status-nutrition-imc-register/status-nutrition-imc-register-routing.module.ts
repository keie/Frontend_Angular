import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StatusNutritionImcRegisterComponent } from './status-nutrition-imc-register.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Roles } from 'src/app/auth/roles.enum';

const imcRegisterRoutes:Routes=[
  {
    path:'',
    component:StatusNutritionImcRegisterComponent,
    pathMatch:'full',
    canActivate:[AuthGuard],
    data:{
      expectedRole:Roles.admin
    }
  }
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(imcRegisterRoutes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class StatusNutritionImcRegisterRoutingModule { }
