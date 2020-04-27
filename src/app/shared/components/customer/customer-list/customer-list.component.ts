import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomerRegisterComponent } from '../customer-register/customer-register.component';



@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  
  customers: Customer[] = [];
  displayedColumns: string[] = ['actions','address', 'id','birthday','lastname', 'name','username','password'];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  
  constructor(private customerService: CustomerService,private dialog:MatDialog,) {
    
  }
  listData:MatTableDataSource<any>;
  
  reload(){
    this.customerService.getCustomerList().subscribe(
      list=>{
        let array=list.map(item=>{
          return{
            id:item.id,
            address:item.address,
            birthday:item.birthday,
            lastname:item.lastname,
            name:item.name,
            username:item.username,
            password:item.password.substring(0,1)
           // roles:item.roles
          };
        });
        this.listData=new MatTableDataSource(array);
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator;
      
      });
  }

  ngOnInit() {
    this.reload();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  onCreate(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.height="75%";
    this.dialog.open(CustomerRegisterComponent,dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.reload();
      });
  }

  onEdit(row){
    this.customerService.populateForm(row);
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.height="75%";
    console.log(this.customerService.form)
    this.dialog.open(CustomerRegisterComponent,dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.reload();
      });
  }

  
}
