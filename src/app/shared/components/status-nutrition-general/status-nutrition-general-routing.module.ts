import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StatusNutritionGeneralListComponent } from './status-nutrition-general-list/status-nutrition-general-list.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Roles } from 'src/app/auth/roles.enum';

const statusNutritionGeneralRoutes:Routes=[
  {
    path:'',
    component:StatusNutritionGeneralListComponent,
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
    RouterModule.forChild(statusNutritionGeneralRoutes)
  ],
  exports:[RouterModule]
})
export class StatusNutritionGeneralRoutingModule { }
