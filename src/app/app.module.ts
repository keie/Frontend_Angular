import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {LoginComponent} from './shared/components/login/login.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: ''}],
  bootstrap: [AppComponent]
})
export class AppModule { }
