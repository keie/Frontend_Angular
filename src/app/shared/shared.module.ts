import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialModule } from './components/material/material.module';
import { LoginModule } from './components/login/login.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';







@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    LogoutComponent,SpinnerComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MaterialModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }],
  exports: [
    HeaderComponent,
    MenuComponent,SpinnerComponent,LoginComponent
  ]
})
export class SharedModule { }
