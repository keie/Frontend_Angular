import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import {LoginComponent} from './shared/components/login/login.component';



const appRoutes:Routes=[
  {
    path:'home',
    loadChildren:'./shared/components/home/home.module#HomeModule'
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path:'', redirectTo:'/login', pathMatch:'full'
  },
  {
    path:'**',loadChildren:'./shared/components/home/home.module#HomeModule'
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
