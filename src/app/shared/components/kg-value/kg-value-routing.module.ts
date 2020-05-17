import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import { KgValueListComponent } from './kg-value-list/kg-value-list.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Roles } from 'src/app/auth/roles.enum';

const kgValuesRoutes:Routes=[
  {
    path:'',
    component:KgValueListComponent,
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
    CommonModule,
    RouterModule.forChild(kgValuesRoutes)
  ],
  exports:[RouterModule]
})
export class KgValueRoutingModule { }
