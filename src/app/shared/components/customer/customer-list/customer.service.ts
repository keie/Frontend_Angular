import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {FormGroup,FormControl,Validators} from "@angular/forms";
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerList:any
  constructor(private http: HttpClient) { }
  form:FormGroup=new FormGroup({
    id:new FormControl(null),
    name:new FormControl('',Validators.required),
    lastname:new FormControl('',Validators.required),
    birthday:new FormControl('',Validators.required),
    address:new FormControl('',Validators.required),
    username:new FormControl('',Validators.email),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])
    //roles:new FormControl(0)
  });

  initializeFormGroup(){
    this.form.setValue({
      id:null,
      name:'',
      lastname:'',
      birthday:'',
      address:'',
      username:'',
      password:''
      //roles:''
    });
  }

  getCustomerListPaginated(rows: number, pages: number): Observable<Customer[]> {//endPoint
    return this.http.get<Customer[]>(`${environment.urlLocal}User/GetListPaginated/${rows}/${pages}`);
  }

  getCustomerList(): Observable<Customer[]> {//endPoint
    var response=this.http.get<Customer[]>(`${environment.urlLocal}User`);
    this.customerList=response
    return response;
  }

  insertCustomer(data:Customer): Observable<Response>{
    data.roles=[];
    var json={
      "name":data.name,
      "lastname":data.lastname,
      "birthday":data.birthday,
      "address":data.address,
      "username":data.username,
      "password":data.password,
      "roles":[]
    }
    return this.http.post(`${environment.urlLocal}User/insert`,json)
    .pipe(
      map((response:any)=>response)
    );
  }

  updateCustomer(data:Customer): Observable<Response>{
    data.roles=[];
    var json={
      "id":data.id,
      "name":data.name,
      "lastname":data.lastname,
      "birthday":data.birthday,
      "address":data.address,
      "username":data.username,
      "password":data.password,
      "roles":[]
    }
    return this.http.put(`${environment.urlLocal}User/update`,json)
    .pipe(
      map((response:any)=>response)
    );
  }

  


  populateForm(customer){
    this.form.setValue({
      id:customer.id,
      name:customer.name,
      lastname:customer.lastname,
      birthday:customer.birthday,
      address:customer.address,
      username:customer.username,
      password:customer.password
    });
  }

}
