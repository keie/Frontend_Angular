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

  
  getPersonReferenceList():Observable<PersonalReference[]>{
    var response=this.http.get<PersonalReference[]>(`${environment.urlLocal}personalReference`);
    this.pReferenceList=response;
    return response;
  }


}
