import { Component, OnInit } from '@angular/core';
import { imc } from '../models/imc';
import { StatusNutritionImcService } from '../status-nutrition-imc.service';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-status-nutrition-imc-register',
  templateUrl: './status-nutrition-imc-register.component.html',
  styleUrls: ['./status-nutrition-imc-register.component.css']
})
export class StatusNutritionImcRegisterComponent implements OnInit {

  Imc:imc
  constructor(public service:StatusNutritionImcService,
    public serviceNotification:NotificationService,
    public dialogRef:MatDialogRef<StatusNutritionImcRegisterComponent>) { }

  ngOnInit(): void {
    this.service.getImcList();
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
        const obj=Object.assign({},this.Imc,this.service.form.value)
        if(!this.service.form.get('id').value){
          this.service.insertImc(obj)
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
          this.service.updateImc(obj)
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
