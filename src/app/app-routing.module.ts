import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import {LoginComponent} from './shared/components/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { Browser } from 'protractor';
import { BrowserModule } from '@angular/platform-browser';




const appRoutes:Routes=[
  {
    path: 'home',
    loadChildren: () => import('./shared/components/home/home.module').then(m => m.HomeModule)
    //component:HomeComponent
    
  },
  {
    path: 'login',
    loadChildren: () => import('./shared/components/login/login.module').then(m => m.LoginModule),
    pathMatch:'full'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
  
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
