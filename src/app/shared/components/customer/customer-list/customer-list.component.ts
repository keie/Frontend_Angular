import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {
  
  customers: Customer[] = [];
  displayedColumns: string[] = ['address', 'birthday', 'id','lastname', 'name','username'];
 
  
  constructor(private customerService: CustomerService) {
    
  }
  listData:MatTableDataSource<any>;
  

  ngOnInit(): void {
    this.customerService.getCustomerList(2,1).subscribe(
      list=>{
        let array=list.map(item=>{
          return{
            id:item.id,
            address:item.address,
            birthday:item.birthday,
            lastname:item.lastname,
            name:item.name,
            username:item.username
          };
        });
        this.listData=new MatTableDataSource(array);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  
}
