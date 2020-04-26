import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer-list/customer.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css'],
  providers:[CustomerService]
})
export class CustomerRegisterComponent implements OnInit {
  customer:Customer
  constructor(public service:CustomerService) { 
  }
  

  roles=[
    {id:1, value:"administrador"},
    {id:2,value:"cliente"}
  ];

  ngOnInit(): void {
    this.service.getCustomerList();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      //this.service.insertCustomer(this.service.form.value);
      const obj=Object.assign({},this.customer,this.service.form.value)
      obj.roles=[]
      this.service.insertCustomer(obj)
      .subscribe(response=>{
        console.log("works!");
      });
      
      this.service.form.reset();
      this.service.initializeFormGroup();
    }else{
      console.log('not valid');
    }
  }

}
