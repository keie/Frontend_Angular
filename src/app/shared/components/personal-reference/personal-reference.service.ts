import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {FormGroup,FormControl,Validators} from "@angular/forms";
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { PersonalReference } from './models/PersonalReference';


@Injectable({
  providedIn: 'root'
})
export class PersonalReferenceService {

  pReferenceList:any

  constructor(private http:HttpClient) { }
  form:FormGroup=new FormGroup({
    id:new FormControl(null),
    age:new FormControl('',Validators.required),
    greaterThan:new FormControl('',Validators.required),
    smallerThan:new FormControl('',Validators.required),
    gender:new FormControl('',Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      id:null,
      age:'',
      greaterThan:'',
      smallerThan:'',
      gender:''
    });
  }

  populateForm(Preference){
    this.form.setValue({
      id:Preference.id,
      age:Preference.age,
      greaterThan:Preference.greaterThan,
      smallerThan:Preference.smallerThan,
      gender:Preference.gender
    });
  }
  
  getPersonReferenceList():Observable<PersonalReference[]>{
    var response=this.http.get<PersonalReference[]>(`${environment.urlLocal}personalReference`);
    this.pReferenceList=response;
    return response;
  }

  insertPersonalReference(data:PersonalReference):Observable<Response>{
    var json={
      "age":parseInt(data.age),
      "greaterThan":parseInt(data.greaterThan),
      "smallerThan":parseInt(data.smallerThan),
      "gender":data.gender
    }
    return this.http.post(`${environment.urlLocal}personalReference/insert`,json)
    .pipe(
      map((response:any)=>response)
    );
  }

  updatePersonalReference(data:PersonalReference): Observable<Response>{
    var json={
      "id":parseInt(data.id),
      "age":parseInt(data.age),
      "greaterThan":parseInt(data.greaterThan),
      "smallerThan":parseInt(data.smallerThan),
      "gender":data.gender,
      "boolDelete":0
    }
    return this.http.put(`${environment.urlLocal}personalReference/update`,json)
    .pipe(
      map((response:any)=>response)
    );
  }

  deletePersonalReference(data): Observable<Response>{
    return this.http.delete(`${environment.urlLocal}personalReference/delete/${data}`)
    .pipe(
      map((response:any)=>response)
    );
  }


}
