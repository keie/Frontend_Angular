import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';







@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }],
  exports: [
    HeaderComponent,
    MenuComponent
  ]
})
export class SharedModule { }
