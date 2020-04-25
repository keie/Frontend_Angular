import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {

  constructor() { 
    console.log("register ts");
  }

  ngOnInit(): void {
  }

}
