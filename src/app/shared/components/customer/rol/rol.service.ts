import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/rol';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http:HttpClient) { }
  
  getListRol(): Observable<Rol[]>{
    return this.http.get<Rol[]>(`${environment.urlLocal}Rol`);
  }
}
