import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {
  
  customers: Customer[] = [];
  displayedColumns: string[] = ['actions','address', 'birthday', 'id','lastname', 'name','username'];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  
  constructor(private customerService: CustomerService,private dialog:MatDialog) {
    
  }
  listData:MatTableDataSource<any>;
  

  ngOnInit(): void {
    this.customerService.getCustomerList().subscribe(
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
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator;
      
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  onCreate(){
    //this.dialog.open(CustomerComponent)
  }

  
}
