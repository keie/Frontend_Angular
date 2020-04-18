import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { Roles } from 'src/app/auth/roles.enum';
import { AuthGuard } from 'src/app/auth/auth.guard';

const customerRoutes : Routes=[
  {
    path:'',
    children:[
      {
        path:'',
        component:CustomerListComponent
      }
    ],
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
    RouterModule.forChild(customerRoutes)
  ],
  exports:[RouterModule]
})
export class CustomerRoutingModule { }
