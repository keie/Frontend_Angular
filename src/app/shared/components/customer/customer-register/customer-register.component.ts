import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer-list/customer.service';
import { Customer } from '../models/customer';
import { RolService } from '../rol/rol.service';
import { Roles } from 'src/app/auth/roles.enum';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { KgValueService } from '../../kg-value/kg-value.service';
import { GradeService } from '../../grade/grade.service';
import { SizeValueService } from '../../size-value/size-value.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {
  customer:Customer
  constructor(public service:CustomerService,
    public serviceRol:RolService,
    public serviceKg:KgValueService,
    public serviceSize:SizeValueService, 
    public serviceNotification:NotificationService,
    public dialogRef:MatDialogRef<CustomerRegisterComponent>) { 
  }
  

  roles:Array<any>;
  flag:number =0;
  kgValues:Array<any>;
  sizeValues:Array<any>;
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
    this.serviceKg.getKgValueList()
    .subscribe(list=>{
      let array=list.map(item=>{
        if(item.boolDelete!=1){
        return{
          id:item.id,
          firstValue:item.firstValue,
          secondValue:item.secondValue
        };
      }
      });
      array = array.filter(function(dato){
        return dato != undefined
      });
      this.kgValues=new Array(array);
      this.kgValues=array
    });

    this.serviceSize.getSizeValueList()
    .subscribe(list=>{
      let array=list.map(item=>{
        if(item.boolDelete!=1){
        return{
          id:item.id,
          firstValue:item.firstValue,
          secondValue:item.secondValue
        };
      }
      });
      array = array.filter(function(dato){
        return dato != undefined
      });
      this.sizeValues=new Array(array);
      this.sizeValues=array
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
        },
        err=>{
          this.serviceNotification.error(err)
          this.onClose();
        });
      }else{
        this.service.updateCustomer(obj)
        .subscribe(response=>{
        console.log("works! update");
        },
        err=>{
          this.serviceNotification.error(err)
          this.onClose();
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
