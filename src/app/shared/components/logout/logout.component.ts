import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template:`
    <p>
      Loggin out...
    </p>
  `
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router ,private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
