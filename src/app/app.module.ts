import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {AuthService}from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule
   
  ],
  providers: [{provide: APP_BASE_HREF, useValue: ''},AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
