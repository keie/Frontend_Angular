import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { KgValue } from '../kg-value/models/kgvalue';
import { environment } from 'src/environments/environment';
import { SizeValue } from './models/sizeValue';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SizeValueService {

  sizeValueList:any
  constructor(private http:HttpClient) { }
  form:FormGroup=new FormGroup({
    id:new FormControl(null),
    firstValue:new FormControl('',Validators.required),
    secondValue:new FormControl('',Validators.required)
  })

  initializeFormGroup(){
    this.form.setValue({
      id:null,
      firstValue:'',
      secondValue:''
    });
  }

  populateForm(data){
    this.form.setValue({
      id:data.id,
      firstValue:data.firstValue,
      secondValue:data.secondValue
    });
  }
  
  getSizeValueList(): Observable<SizeValue[]> {//endPoint
    var response=this.http.get<SizeValue[]>(`${environment.urlLocal}sizevalue`);
    this.sizeValueList=response
    return response;
  }

  insertSizeValue(data:SizeValue): Observable<Response>{
    var json={
      "firstValue":parseFloat(data.firstValue),
      "secondValue":parseFloat(data.secondValue),
      "boolDelete":0
    }
    return this.http.post(`${environment.urlLocal}sizevalue/insert`,json)
    .pipe(
      map((response:any)=>response)
    );
  }

  updateSizeValue(data:SizeValue): Observable<Response>{
    var json={
      "id":parseInt(data.id),
      "firstValue":parseFloat(data.firstValue),
      "secondValue":parseFloat(data.secondValue),
      "boolDelete":0
    }
    return this.http.put(`${environment.urlLocal}sizevalue/update`,json)
    .pipe(
      map((response:any)=>response)
    );
  }

  deleteSizeValue(data): Observable<Response>{
    return this.http.delete(`${environment.urlLocal}sizevalue/delete/${data}`)
    .pipe(
      map((response:any)=>response)
    );
  }

  


}
