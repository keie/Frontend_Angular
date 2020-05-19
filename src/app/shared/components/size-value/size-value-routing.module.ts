import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule, Router } from '@angular/router';
import { SizeValueListComponent } from './size-value-list/size-value-list.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Roles } from 'src/app/auth/roles.enum';

const sizeValueRoutes:Routes=[
  {
    path:'',
    component:SizeValueListComponent,
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
    RouterModule.forChild(sizeValueRoutes)
  ],
  exports:[RouterModule]
})
export class SizeValueRoutingModule { }
