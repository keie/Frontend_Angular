import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError="";
  loginForm: FormGroup;
  isVisible= false;
  constructor(private fb:FormBuilder, private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.logout();
    this.buildLoginForm();
  }
  buildLoginForm(): void{
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]]
    });
  }
  login(submittedForm: FormGroup){//endpointLogin
    this.isVisible=true;
    this.authService.login(submittedForm.value.email,submittedForm.value.password).
    subscribe(authResponse=>{
      this.isVisible=false;
      this.router.navigate(['/', 'home']);
    },error=>{this.loginError=error;this.isVisible=false});
  }

}