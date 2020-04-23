import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer';
import { DataTableDirective } from 'angular-datatables';
import * as $ from 'jquery';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  customers: Customer[] = [];
  constructor(private customerService: CustomerService) {
    this.getCustomer(2, 1);
  }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'customers',
      columns: [
        {
          title: 'panel',
          data: 'panel'
        },
        {
          title: 'address',
          data: 'address'
        }, {
          title: 'birthday',
          data: 'birthday'
        }, {
          title: 'id',
          data: 'id'
        },
        {
          title: 'lastname',
          data: 'lastname'
        },
        {
          title: 'name',
          data: 'name'
        },
        {
          title: 'username',
          data: 'username'
        }]
    };
  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
  }


  getCustomer(pages: number, rows: number): void {
    this.customerService.getCustomerList(pages, rows) //dataService Method
      .subscribe(
        response => this.customers = response
      );
  }

}
