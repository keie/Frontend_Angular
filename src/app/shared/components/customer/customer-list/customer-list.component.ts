import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomerRegisterComponent } from '../customer-register/customer-register.component';
import { NotificationService } from '../../notification/notification.service';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent implements OnInit {
  
  customers: Customer[] = [];
  displayedColumns: string[] = ['actions','address', 'id','birthday','lastname', 'name','username','password'];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  isVisible= false;
  constructor(private customerService: CustomerService,
    private dialog: MatDialog,
    private notificationService:NotificationService) {
    
  }
  
  
    addressFilter=new FormControl();
    birthdayFilter=new FormControl();
    lastnameFilter=new FormControl();
    nameFilter=new FormControl();
    usernameFilter=new FormControl();

  filteredValues={address:"",birthday:"",lastname:"",name:"",username:""}
  
  listData:MatTableDataSource<any>;
  
  reload(){
    this.isVisible=true;
    this.customerService.getCustomerList().subscribe(
      list=>{
        let array=list.map(item=>{
          if(item.boolDelete!=1){
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
          }
        });
        array = array.filter(function(dato){
          return dato != undefined
        });
        this.listData=new MatTableDataSource(array);
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator;
        this.isVisible=false;
      });
  }

  ngOnInit() {
    this.reload();
  }

  applyFilter() {
    /*const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();*/
    this.addressFilter.valueChanges.subscribe(addressFilterValue=>{
      this.filteredValues['address']=addressFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })
    this.birthdayFilter.valueChanges.subscribe(birthdayFilterValue=>{
      this.filteredValues['birthday']=birthdayFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })
    this.lastnameFilter.valueChanges.subscribe(lastnameFilterValue=>{
      this.filteredValues['lastname']=lastnameFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })
    this.nameFilter.valueChanges.subscribe(nameFilterValue=>{
      this.filteredValues['name']=nameFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })
    this.usernameFilter.valueChanges.subscribe(usernameFilterValue=>{
      this.filteredValues['username']=usernameFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })

    this.listData.filterPredicate=this.customFilterPredicate();
  }

  

  customFilterPredicate(){
    const myFilterPredicate=function(data:Customer,filter:string):boolean{
      let searchString=JSON.parse(filter);
      let addresFound=data.address.toString().trim().toLowerCase().indexOf(searchString.address.toLowerCase())!==-1
      let birthdayFound=data.birthday.toString().trim().indexOf(searchString.birthday)!==-1
      let lastnameFound=data.lastname.toString().trim().indexOf(searchString.lastname)!==-1
      let nameFound=data.name.toString().trim().indexOf(searchString.name)!==-1
      let usernameFound=data.username.toString().trim().indexOf(searchString.username)!==-1
    if(searchString.topFilter){
      return addresFound || birthdayFound || lastnameFound || nameFound || usernameFound
    }else{
      return addresFound && birthdayFound && lastnameFound && nameFound && usernameFound
    }
    
    }
    return myFilterPredicate;
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

  onDelete(data){
    if(confirm("Estas seguro de eliminar este registro?")){
      this.customerService.deleteCustomer(data)
      .subscribe(res=>{
        this.reload();
      });
      this.notificationService.warn("Registro borrado con exito");
      
    }
  }

  
}
