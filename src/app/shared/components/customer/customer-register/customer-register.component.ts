import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer-list/customer.service';
import { Customer } from '../models/customer';
import { RolService } from '../rol/rol.service';
import { Roles } from 'src/app/auth/roles.enum';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {
  customer:Customer
  constructor(public service:CustomerService,
    public serviceRol:RolService, 
    public serviceNotification:NotificationService,
    public dialogRef:MatDialogRef<CustomerRegisterComponent>) { 
  }
  

  roles:Array<any>;
  flag:number =0;

  ngOnInit(): void {
    this.service.getCustomerList();
    this.serviceRol.getListRol()
    .subscribe(list=>{
      let array=list.map(item=>{
        return{
          id:item.id,
          name:item.name,
          description:item.description
        };
      });
      this.roles=new Array(array);
      this.roles=array
      
    });
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    
  }

  onSubmit(){
    if(this.service.form.valid){
      
      const obj=Object.assign({},this.customer,this.service.form.value)
      obj.roles=[]
      if(!this.service.form.get('id').value){
        this.service.insertCustomer(obj)
        .subscribe(response=>{
        console.log("works! insert");
        });
      }else{
        this.service.updateCustomer(obj)
        .subscribe(response=>{
        console.log("works! update");
        });
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.serviceNotification.success(":: Operation Successfully");
      this.onClose();
      
    }else{
      console.log('not valid');
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onDelete(id){

  }

}
