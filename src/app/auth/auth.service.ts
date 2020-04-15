import { Injectable } from '@angular/core';
import { Roles } from './roles.enum';
import { Observable, BehaviorSubject, throwError as observableThrowError } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map, catchError} from "rxjs/operators";
import * as decode from "jwt-decode";
import { transformError } from '../common/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

private readonly authProvider:(username:string,password:string)=>Observable<IServerAuthResponse>
authStatus=new BehaviorSubject<IAuthStatus>(defaultAuthStatus); //listen changes about status

constructor(private httpClient:HttpClient) { 
  this.authProvider=this.userAuthProvider;

}

private userAuthProvider(username:string,password:string):Observable<IServerAuthResponse>{
  return this.httpClient.post<IServerAuthResponse>(`${environment.urlLocal}token`,{username:username,password:password});
}//endpoint

login(username:string,password:string):Observable<IAuthStatus>{
  this.logout();
  const loginResponse=this.authProvider(username,password).pipe(
    map(value=>{
      const result=decode(value.access_Token);
      return result as IAuthStatus
    }),
    catchError(transformError)
  );

  loginResponse.subscribe(
    res=>{
      this.authStatus.next(res);
    },
    err=>{
      this.logout();
      return observableThrowError(err);
    }
  )
  return loginResponse;
}

logout(){
  this.authStatus.next(defaultAuthStatus);
}
}
export interface IAuthStatus{
  roles:Roles;
  primarysid:number;
  unique_name:string;

}
interface IServerAuthResponse{
  access_Token:string;
}

const defaultAuthStatus:IAuthStatus={roles:Roles.none,primarysid:null,unique_name:null};
