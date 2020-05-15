import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { PersonalReferenceRoutingModule } from './shared/components/personal-reference/personal-reference-routing.module';




const appRoutes:Routes=[
  {
    path: 'home',
    loadChildren: () => import('./shared/components/home/home.module').then(m => m.HomeModule),
    pathMatch:'full',
    canLoad:[AuthGuard]
  },
  {
    path: 'login',
   /* loadChildren: () => import('./shared/components/login/login.module').then(m => m.LoginModule),
    pathMatch:'full'*/
    component:LoginComponent
  },
  {
    path: 'customer',
    loadChildren: () => import('./shared/components/customer/customer.module').then(m => m.CustomerModule),
    pathMatch:'full',
    canLoad:[AuthGuard]
  },
  {
    path:'personalReference',
    loadChildren:()=> import('./shared/components/personal-reference/personal-reference.module').then(m=>PersonalReferenceRoutingModule),
    pathMatch:'full',
    canLoad:[AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./shared/components/customer/customer-register/customer-register.module').then(m => m.CustomerRegisterModule),
    pathMatch:'full',
    canLoad:[AuthGuard]
  },
  {
    path:'logout',
    component:LogoutComponent
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
