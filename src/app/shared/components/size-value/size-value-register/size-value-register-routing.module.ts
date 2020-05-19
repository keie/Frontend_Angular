import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeValueRegisterComponent } from './size-value-register.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Roles } from 'src/app/auth/roles.enum';
import { Routes, RouterModule } from '@angular/router';

const sizeValueRegisterRoutes:Routes=[
  {
    path:'',
    component:SizeValueRegisterComponent,
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
    RouterModule.forChild(sizeValueRegisterRoutes)
  ],
  exports:[RouterModule]
})
export class SizeValueRegisterRoutingModule { }
