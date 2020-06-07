import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { imc } from './models/imc';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusNutritionImcService {

  imcList:any
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
  populateForm(data){
    this.form.setValue({
      id:data.id,
      firstValue:data.firstValue,
      secondValue:data.secondValue
    });
  }


  getImcList():Observable<imc[]>{
    var response=this.http.get<imc[]>(`${environment.urlLocal}imc`);
    this.imcList=response
    return response;
  }

  insertImc(data:imc): Observable<Response>{
    var json={
      "firstValue":parseFloat(data.firstValue),
      "secondValue":parseFloat(data.secondValue)
    }
    return this.http.post(`${environment.urlLocal}imc/insert`,json)
    .pipe(
      map((response:any)=>response)
    );
  }
  
  updateImc(data:imc): Observable<Response>{
    var json={
      "id":parseInt(data.id),
      "firstValue":parseFloat(data.firstValue),
      "secondValue":parseFloat(data.secondValue),
      "boolDelete":0
    }
    return this.http.put(`${environment.urlLocal}imc/update`,json)
    .pipe(
      map((response:any)=>response)
    );
  }

  deleteImc(data): Observable<Response>{
    return this.http.delete(`${environment.urlLocal}imc/delete/${data}`)
    .pipe(
      map((response:any)=>response)
    );
  }

  
}
