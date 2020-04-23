import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import{HomeComponent} from './home.component';
import { CommonModule } from '@angular/common';

const homeRoutes : Routes=[
  {
    path:'',
    component:HomeComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    
    RouterModule.forChild(homeRoutes)
  ],
  exports:[RouterModule]
})
export class HomeRoutingModule { }