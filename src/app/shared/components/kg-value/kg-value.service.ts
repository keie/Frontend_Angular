import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { KgValue } from './models/kgvalue';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KgValueService {

  kgvList:any
  constructor(private http:HttpClient) { }
  form:FormGroup=new FormGroup({
    id:new FormControl(null),
    firstValue:new FormControl('',Validators.required),
    secondValue:new FormControl('',Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      id:null,
      firstValue:'',
      secondValue:''
    });
  }

  populateForm(kgvList){
    this.form.setValue({
      id:kgvList.id,
      firstValue:kgvList.firstValue,
      secondValue:kgvList.secondValue
    });
  }

  getKgValueList(): Observable<KgValue[]> {//endPoint
    var response=this.http.get<KgValue[]>(`${environment.urlLocal}kgvalue`);
    this.kgvList=response
    return response;
  }

  insertKgValue(data:KgValue): Observable<Response>{
    
    var json={
      "firstValue":parseFloat(data.firstValue),
      "secondValue":parseFloat(data.secondValue)
    }
    
    return this.http.post(`${environment.urlLocal}kgvalue/insert`,json)
    .pipe(
      map((response:any)=>response)
      
    );
  }

  updateKgValue(data:KgValue): Observable<Response>{
    var json={
      "id":parseInt(data.firstValue),
      "firstValue":parseFloat(data.firstValue),
      "secondValue":parseFloat(data.secondValue),
      "boolDelete":0
    }
    return this.http.put(`${environment.urlLocal}kgvalue/update`,json)
    .pipe(
      map((response:any)=>response)
    );
  }

  deleteKgValue(data): Observable<Response>{
    return this.http.delete(`${environment.urlLocal}kgvalue/delete/${data}`)
    .pipe(
      map((response:any)=>response)
    );
  }

  


  


}
