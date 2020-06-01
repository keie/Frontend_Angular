import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { PersonalReferenceRoutingModule } from './shared/components/personal-reference/personal-reference-routing.module';
import { PersonalReferenceModule } from './shared/components/personal-reference/personal-reference.module';




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
    loadChildren:()=> import('./shared/components/personal-reference/personal-reference.module').then(m => m.PersonalReferenceModule),
    pathMatch:'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./shared/components/customer/customer-register/customer-register.module').then(m => m.CustomerRegisterModule),
    pathMatch:'full',
    canLoad:[AuthGuard]
  },
  {
    path:'registerPersonalReference',
    loadChildren:()=> import('./shared/components/personal-reference/personal-reference-register/personal-reference-register.module').then(m=>m.PersonalReferenceRegisterModule),
  },
  {
    path:'kgvalues',
    loadChildren:()=> import('./shared/components/kg-value/kg-value.module').then(m => m.KgValueModule),
    pathMatch:'full'
  },
  {
    path:'kgvaluesRegister',
    loadChildren:()=> import('./shared/components/kg-value/kg-value-register/kg-value-register.module').then(m => m.KgValueRegisterModule),
    pathMatch:'full'
  },
  {
    path:'sizevalueList',
    loadChildren:()=> import('./shared/components/size-value/size-value.module').then(m => m.SizeValueModule),
    pathMatch:'full'
  },
  {
    path:'sizevalueRegister',
    loadChildren:()=> import('./shared/components/size-value/size-value-register/size-value-register.module').then(m => m.SizeValueRegisterModule),
    pathMatch:'full'
  },
  {
    path:'statusNutritionGeneral',
    loadChildren:()=> import('./shared/components/status-nutrition-general/status-nutrition-general.module').then(m => m.StatusNutritionGeneralModule),
    pathMatch:'full'
  },
  {
    path:'statusNutritionImc',
    loadChildren:()=> import('./shared/components/status-nutrition-imc/status-nutrition-imc.module').then(m => m.StatusNutritionImcModule),
    pathMatch:'full'
  },
  {
    path:'statusNutritionGeneralRegister',
    loadChildren:()=> import('./shared/components/status-nutrition-general/status-nutrition-general-register/status-nutrition-general-register.module').then(m => m.StatusNutritionGeneralRegisterModule),
    pathMatch:'full'
  },
  {
    path:'logout',
    component:LogoutComponent
  }/* ,
  
 {
   path:'', redirectTo:'/login', pathMatch:'full'
  }*/
  
];

@NgModule({
  declarations: [],
  imports: [
   
    
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
