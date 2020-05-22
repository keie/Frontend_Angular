import { Injectable } from '@angular/core';
import { statusNutritionGeneral } from './models/statusNutritionGeneral';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusNutritionGeneralService {

  statusNutrition:any;
  constructor(private http:HttpClient) { }
  form:FormGroup=new FormGroup({
    id:new FormControl(null),
    kgValues: new FormControl('',Validators.required),
    sizeValues:new FormControl('',Validators.required),
    pReferences:new FormControl('',Validators.required),
    grades:new FormControl('',Validators.required)
  })

  initializeFormGroup(){
    this.form.setValue({
      id:null,
      kgValues:'',
      sizeValues:'',
      pReferences:'',
      grades:''
    });
  }

  populateForm(statusNutrition){
    this.form.setValue({
      id:statusNutrition.id,
      idKgVal:statusNutrition.idKgVal,
      idSizeVal:statusNutrition.idSizeVal,
      idPreference:statusNutrition.idPreference,
      idGrade:statusNutrition.idGrade
    });
  }

  getStatusNutritionList():Observable<statusNutritionGeneral[]>{
    var response=this.http.get<statusNutritionGeneral[]>(`${environment.urlLocal}statusNutritionGeneral`);
    this.statusNutrition=response
    return response;
  }

  insertKgValue(data:statusNutritionGeneral): Observable<Response>{
    
    var json={
      
      "kgValues":[],
      "pReferences":[],
      "sizeValues":[],
      "grades":[],
      "idPreference":parseInt(data.pReferences),
      "idKgVal":parseInt(data.kgValues),
      "idSizeVal":parseInt(data.sizeValues),
      "idGrade":parseInt(data.grades),
      "boolDelete":0
    }
    
    return this.http.post(`${environment.urlLocal}statusNutritionGeneral/insert`,json)
    .pipe(
      map((response:any)=>response)
      
    );
  }

  deleteStatusNutritionGeneral(data): Observable<Response>{
    return this.http.delete(`${environment.urlLocal}statusNutritionGeneral/delete/${data}`)
    .pipe(
      map((response:any)=>response)
    );
  }


}
