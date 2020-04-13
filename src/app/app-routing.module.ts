import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import {LoginComponent} from './shared/components/login/login.component';


const appRoutes:Routes=[
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path:'',redirectTo: 'login', pathMatch:'full'
  }
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
