import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalReferenceRegisterComponent } from './personal-reference-register.component';
import { PersonalReferenceRoutingModule } from '../personal-reference-routing.module';



@NgModule({
  declarations: [PersonalReferenceRegisterComponent],
  imports: [
    CommonModule,
    PersonalReferenceRoutingModule
  ],
  exports:[PersonalReferenceRegisterComponent]
})
export class PersonalReferenceRegisterModule { }
