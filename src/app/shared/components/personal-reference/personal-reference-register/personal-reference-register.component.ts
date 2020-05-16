import { Component, OnInit } from '@angular/core';
import { PersonalReference } from '../models/PersonalReference';
import { PersonalReferenceService } from '../personal-reference.service';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-personal-reference-register',
  templateUrl: './personal-reference-register.component.html',
  styleUrls: ['./personal-reference-register.component.css']
})
export class PersonalReferenceRegisterComponent implements OnInit {
  
  pReference:PersonalReference
  constructor(public service:PersonalReferenceService,
    public serviceNotification:NotificationService,
    public dialogRef:MatDialogRef<PersonalReferenceRegisterComponent>) { }

  flag:number=0

  ngOnInit(): void {
    this.service.getPersonReferenceList();

  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.service.form.valid){
      
      const obj=Object.assign({},this.pReference,this.service.form.value)
      
      if(!this.service.form.get('id').value){
        this.service.insertPersonalReference(obj)
        .subscribe(response=>{
        console.log("works! insert");
        });
      }/*else{
        this.service.updateCustomer(obj)
        .subscribe(response=>{
        console.log("works! update");
        });
      }*/
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.serviceNotification.success(":: Operation Successfully");
      this.onClose();
      
    }else{
      console.log('not valid');
    }
  }

}
