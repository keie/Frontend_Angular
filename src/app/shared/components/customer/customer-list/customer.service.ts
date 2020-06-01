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
    nroDoc:new FormControl('',Validators.required),
    //password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    //roles:new FormControl(0)
    gender:new FormControl(0),
    //height:new FormControl('',Validators.required),
    //weight:new FormControl('',Validators.required)
    kgValues: new FormControl('',Validators.required),
    sizeValues:new FormControl('',Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      id:null,
      name:'',
      lastname:'',
      birthday:'',
      address:'',
      username:'',
      //password:'',
      nroDoc:'',
      gender:'',
      kgValues:'',
      sizeValues:''
      //height:'',
      //weight:''
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
      //"username":data.username,
      "username":data.username,
      "password":"NA",
      "nroDoc":data.nroDoc,
      "gender":data.gender,
      //"height":data.height,
      //"weight":data.weight,
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
      "nroDoc":data.nroDoc,
      "gender":data.gender,
      //"height":data.height,
      //"weight":data.weight,
      //"password":data.password,
      "roles":[]
    }
    return this.http.put(`${environment.urlLocal}User/update`,json)
    .pipe(
      map((response:any)=>response)
    );
  }
  deleteCustomer(data): Observable<Response>{
    return this.http.delete(`${environment.urlLocal}User/delete/${data}`)
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
      kgValues:"NA",
      sizeValues:"NA",
      nroDoc:customer.nroDoc,
      gender:customer.gender,
      username:customer.username,
      //password:customer.password
    });
  }

}
