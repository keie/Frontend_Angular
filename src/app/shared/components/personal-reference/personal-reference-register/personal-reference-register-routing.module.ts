import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonalReferenceRegisterComponent } from './personal-reference-register.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Roles } from 'src/app/auth/roles.enum';

const personalReferenceRegRoutes: Routes=[
  {
    path:'',
    component:PersonalReferenceRegisterComponent,
    pathMatch:'full',
    canActivate:[AuthGuard],
    data:{
      expectedRole:Roles.admin
    }
  }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(personalReferenceRegRoutes)
  ],
  exports:[RouterModule]
})
export class PersonalReferenceRegisterRoutingModule { }
