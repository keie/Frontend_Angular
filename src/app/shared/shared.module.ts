import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    MenuComponent,
    LoginComponent
  ]
})
export class SharedModule { }
