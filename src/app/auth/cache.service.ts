import { Injectable } from '@angular/core';
import { flatten } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export abstract class CacheService {

  protected getItem<T>(key: string): T{
    const data = localStorage.getItem(key);
    if(data && data!== "undefined"){
      return JSON.parse(data);
    }
    return null;
  }

  protected setItem(key:string ,data: object | string ){
    if(typeof data==='string'){
      localStorage.setItem(key,JSON.stringify(data));
    }
    
    
    //localStorage.setItem(key,JSON.stringify(aux));
  }
  
  protected removeItem(key: string){
    localStorage.removeItem(key);
  }

  protected clear(){
    localStorage.clear();
  }
}