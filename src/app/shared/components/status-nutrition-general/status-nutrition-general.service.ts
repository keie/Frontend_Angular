import { Injectable } from '@angular/core';
import { statusNutritionGeneral } from './models/statusNutritionGeneral';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusNutritionGeneralService {

  statusNutrition:any;
  constructor(private http:HttpClient) { }
  form:FormGroup=new FormGroup({
    id:new FormControl(null),
    idKgVal: new FormControl(0),
    idSizeVal:new FormControl(0),
    idPreference:new FormControl(0),
    idGrade:new FormControl(0)
  })

  initializeFormGroup(){
    this.form.setValue({
      id:null,
      idKgVal:'',
      idSizeVal:'',
      idPreference:'',
      idGrade:''
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


}
