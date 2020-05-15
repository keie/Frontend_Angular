import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PersonalReferenceListComponent} from './personal-reference-list/personal-reference-list.component';
import { Routes, RouterModule } from '@angular/router';
import { Roles } from 'src/app/auth/roles.enum';
import { AuthGuard } from 'src/app/auth/auth.guard';

const personalReferenceRoutes:Routes=[
  {
    path:'',
    component:PersonalReferenceListComponent,
    pathMatch:'full',
    
    canActivate:[AuthGuard],
    data:{
      expectedRole:Roles.admin
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(personalReferenceRoutes)
  ],
  exports:[RouterModule]
})
export class PersonalReferenceRoutingModule { }
