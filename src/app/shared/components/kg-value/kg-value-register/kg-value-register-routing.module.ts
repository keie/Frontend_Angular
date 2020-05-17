import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';
import { KgValueRegisterComponent } from './kg-value-register.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Roles } from 'src/app/auth/roles.enum';

const KgValueRegisterRoutes:Routes=[
  {
    path:'',
    component:KgValueRegisterComponent,
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
    RouterModule.forChild(KgValueRegisterRoutes)
  ],
  exports:[RouterModule]
})
export class KgValueRegisterRoutingModule { }
