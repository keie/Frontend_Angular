import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  constructor(private customerService: CustomerService) {
    this.getCustomer(2, 1);
  }

  ngOnInit(): void {
  }

  getCustomer(pages: number, rows: number): void {
    this.customerService.getCustomerList(pages, rows) //dataService Method
      .subscribe(
        response => this.customers = response
      );
  }

}
