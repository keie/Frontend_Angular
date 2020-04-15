import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import{HomeComponent} from './home.component';

const homeRoutes : Routes=[
  {
    children:[
      {
        path:'home',
        component:HomeComponent,
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports:[RouterModule]
})
export class HomeRoutingModule { }