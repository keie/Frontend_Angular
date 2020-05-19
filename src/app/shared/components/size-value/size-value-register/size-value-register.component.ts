import { Component, OnInit } from '@angular/core';
import { SizeValue } from '../models/sizeValue';
import { SizeValueService } from '../size-value.service';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-size-value-register',
  templateUrl: './size-value-register.component.html',
  styleUrls: ['./size-value-register.component.css']
})
export class SizeValueRegisterComponent implements OnInit {

  sizeValue:SizeValue
  constructor(public service:SizeValueService,
    public serviceNotification:NotificationService,
    public dialogRef:MatDialogRef<SizeValueRegisterComponent>) { }

  ngOnInit(): void {
    this.service.getSizeValueList();
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
    var flag=0;
      if(this.service.form.valid){
        const obj=Object.assign({},this.sizeValue,this.service.form.value)
        if(!this.service.form.get('id').value){
          this.service.insertSizeValue(obj)
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
          this.service.updateSizeValue(obj)
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
