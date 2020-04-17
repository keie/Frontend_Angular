import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';






const appRoutes:Routes=[
  {
    path: 'home',
    loadChildren: () => import('./shared/components/home/home.module').then(m => m.HomeModule),
    pathMatch:'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./shared/components/login/login.module').then(m => m.LoginModule),
    pathMatch:'full'
  },
  {
    path:'', redirectTo:'/login', pathMatch:'full'
  }
  
];

@NgModule({
  declarations: [],
  imports: [
   
    
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
