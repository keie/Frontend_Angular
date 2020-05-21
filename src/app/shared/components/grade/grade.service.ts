import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grade } from './models/Grade';
import { Observable } from 'rxjs';
import { statusNutritionGeneral } from '../status-nutrition-general/models/statusNutritionGeneral';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  Grade:any;
  constructor(private http:HttpClient) { }

  getGradeList():Observable<Grade[]>{
    var response=this.http.get<Grade[]>(`${environment.urlLocal}grade`);
    this.Grade=response
    return response;
  }
}
