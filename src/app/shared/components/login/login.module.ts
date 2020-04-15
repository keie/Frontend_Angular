import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: LoginComponent
    }])
  ],
  exports:[RouterModule,LoginComponent],
  schemas:[NO_ERRORS_SCHEMA ]
})
export class LoginModule { }
