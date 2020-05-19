import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeValueListComponent } from './size-value-list/size-value-list.component';
import { SizeValueRoutingModule } from './size-value-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { SizeValueRegisterComponent } from './size-value-register/size-value-register.component';



@NgModule({
  declarations: [SizeValueListComponent],
  imports: [
    CommonModule,
    SizeValueRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[SizeValueListComponent]
})
export class SizeValueModule { }
