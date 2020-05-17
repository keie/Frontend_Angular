import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { KgValue } from './models/kgvalue';

@Injectable({
  providedIn: 'root'
})
export class KgValueService {

  kgvList:any
  constructor(private http:HttpClient) { }

  getKgValueList(): Observable<KgValue[]> {//endPoint
    var response=this.http.get<KgValue[]>(`${environment.urlLocal}kgvalue`);
    this.kgvList=response
    return response;
  }


}
