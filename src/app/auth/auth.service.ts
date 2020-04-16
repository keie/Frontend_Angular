import { Injectable } from '@angular/core';
import { Roles } from './roles.enum';
import { Observable, BehaviorSubject, throwError as observableThrowError } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map, catchError} from "rxjs/operators";
import * as decode from "jwt-decode";
import { transformError } from '../common/common';
import { CacheService } from './cache.service';
@Injectable({
  providedIn: 'root'
})

export class AuthService extends CacheService{

private readonly authProvider:(username:string,password:string)=>Observable<IServerAuthResponse>;
authStatus=new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaultAuthStatus); //listen changes about status

constructor(private httpClient:HttpClient) { 
  super();
  this.authStatus.subscribe(authStatus => {
    if(globalData.primarysid!=null){
      this.setItem('authStatus',JSON.stringify(globalData));
    }else{
      this.setItem('authStatus',this.authStatus);
    }
    
    
  });
  this.authProvider=this.userAuthProvider;
  console.log("i am on constructor");
}

private userAuthProvider(username:string,password:string):Observable<IServerAuthResponse>{
  return this.httpClient.post<IServerAuthResponse>(`${environment.urlLocal}token`,{username:username,password:password});
}//endpoint

login(username:string,password:string):Observable<IAuthStatus>{
  this.logout();
  const loginResponse=this.authProvider(username,password).pipe(
    map(value=>{
      this.setToken(value.access_Token);
      const result=decode(value.access_Token);
      return result as IAuthStatus
    }),
    catchError(transformError)
  );
  loginResponse.subscribe(
    res=>{
      //this.setItem('authStatus',res);
      globalData=res;
      this.authStatus.next(res);
      console.log("i am on response the value auhStatus is...")
      console.log( this.authStatus.value)
    },
    err=>{
      this.logout();
      return observableThrowError(err);
    }
  )
  return loginResponse;
}

logout(){
  this.clearToken();
  this.authStatus.next(defaultAuthStatus);
}

private setToken(jwt:string){
  this.setItem('jwt',jwt);
}

getToken():string{
  return this.getItem('jwt') || '';
}

private clearToken(){
  this.removeItem('jwt');
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
var globalData:IAuthStatus={roles:Roles.none,primarysid:null,unique_name:null};
