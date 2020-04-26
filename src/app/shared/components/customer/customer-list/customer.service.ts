import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {FormGroup,FormControl,Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  form:FormGroup=new FormGroup({
    $key:new FormControl(null),
    $name:new FormControl('',Validators.required),
    $lastname:new FormControl('',Validators.required),
    $birthday:new FormControl('',Validators.required),
    $address:new FormControl('',Validators.required),
    $username:new FormControl('',Validators.email),
    $password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    $rol:new FormControl(0)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      $name:'',
      $lastname:'',
      $birthday:'',
      $address:'',
      $username:'',
      $password:''
    });
  }

  getCustomerListPaginated(rows: number, pages: number): Observable<Customer[]> {//endPoint
    return this.http.get<Customer[]>(`${environment.urlLocal}User/GetListPaginated/${rows}/${pages}`);
  }

  getCustomerList(): Observable<Customer[]> {//endPoint
    return this.http.get<Customer[]>(`${environment.urlLocal}User`);
  }
}
