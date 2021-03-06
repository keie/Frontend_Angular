import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tutorial';

  _displayLogin=false;
constructor(private authService:AuthService){

}
  ngOnInit(): void {
    this.authService.authStatus.subscribe(
      authStatus =>{
        const jwt= this.authService.getToken();
        setTimeout(()=>(this._displayLogin=!(jwt==null || jwt===''),0));
      }
    );
  }
get displayNavBar(){
  return this._displayLogin;
}
get displayMenu(){
  return this._displayLogin;
}
get displayHome(){
  return this._displayLogin;
}
}

