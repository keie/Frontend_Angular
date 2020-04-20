import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomerList(rows: number, pages: number): Observable<Customer[]> {//endPoint
    return this.http.get<Customer[]>(`${environment.urlLocal}User/GetListPaginated/${rows}/${pages}`);
  }
}
