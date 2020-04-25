import { NgModule } from '@angular/core';
import { CustomerRegisterComponent } from './customer-register.component';
import { RouterModule, Routes } from '@angular/router';


const customerRegisterRoutes:Routes=[
  {
    path:'',
    component:CustomerRegisterComponent,
    pathMatch:'full'
    
  }
];


@NgModule({
  declarations: [],
  imports: [
    
    RouterModule.forChild(customerRegisterRoutes)
  ],
  exports:[RouterModule]
})

export class CustomerRegisterRoutingModule { }
