import { Component, OnInit } from '@angular/core';
import { KgValue } from '../models/kgvalue';
import { KgValueService } from '../kg-value.service';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonalReferenceRegisterComponent } from '../../personal-reference/personal-reference-register/personal-reference-register.component';

@Component({
  selector: 'app-kg-value-register',
  templateUrl: './kg-value-register.component.html',
  styleUrls: ['./kg-value-register.component.css']
})
export class KgValueRegisterComponent implements OnInit {

  kbValue:KgValue
  constructor(public service:KgValueService,
    public serviceNotification:NotificationService,
    public dialogRef:MatDialogRef<PersonalReferenceRegisterComponent>) { }
    flag:number=0

  ngOnInit(): void {
    this.service.getKgValueList();
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
  timeResponse(){
     this.serviceNotification.error(":: Transaction Error");
  }

  onSubmit(){
    var flag=0;
      if(this.service.form.valid){
        const obj=Object.assign({},this.kbValue,this.service.form.value)
        if(!this.service.form.get('id').value){
          this.service.insertKgValue(obj)
          .subscribe(response=>{
            if(response.status!=0){
              flag++;
              this.service.form.reset();
              this.service.initializeFormGroup();
              this.serviceNotification.success(":: Operation Successfully");
              this.onClose();
            }
            
          },
          err=>{
            this.serviceNotification.error(":: Transaction Error :");
            this.onClose();
          });
        }
        else{
          this.service.updateKgValue(obj)
          .subscribe(response=>{
            if(response!=null){
              this.service.form.reset();
              this.service.initializeFormGroup();
              this.serviceNotification.success(":: Operation Successfully");
              this.onClose();
            }
            
          },
          err=>{
            this.serviceNotification.error(err)
            this.onClose();
          });
        }
        }
    }
}
