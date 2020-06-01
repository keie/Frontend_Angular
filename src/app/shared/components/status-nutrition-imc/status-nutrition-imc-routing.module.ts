import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StatusNutritionImcListComponent } from './status-nutrition-imc-list/status-nutrition-imc-list.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Roles } from 'src/app/auth/roles.enum';

const statusNutritionImcRoutes:Routes=[
  {
    path:'',
    component:StatusNutritionImcListComponent,
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
    RouterModule.forChild(statusNutritionImcRoutes)
  ],
  exports:[RouterModule]
})
export class StatusNutritionImcRoutingModule { }
