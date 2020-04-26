import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer-list/customer.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {

  constructor(public service:CustomerService) { 
  }

  roles=[
    {id:1, value:"administrador"},
    {id:2,value:"cliente"}
  ];

  ngOnInit(): void {
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}
