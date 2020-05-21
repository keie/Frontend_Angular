import { Component, OnInit } from '@angular/core';
import { statusNutritionGeneral } from '../models/statusNutritionGeneral';
import { StatusNutritionGeneralService } from '../status-nutrition-general.service';
import { NotificationService } from '../../notification/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { KgValueRegisterComponent } from '../../kg-value/kg-value-register/kg-value-register.component';
import { KgValueService } from '../../kg-value/kg-value.service';
import { SizeValueService } from '../../size-value/size-value.service';
import { PersonalReferenceService } from '../../personal-reference/personal-reference.service';
import { GradeService } from '../../grade/grade.service';

@Component({
  selector: 'app-status-nutrition-general-register',
  templateUrl: './status-nutrition-general-register.component.html',
  styleUrls: ['./status-nutrition-general-register.component.css']
})
export class StatusNutritionGeneralRegisterComponent implements OnInit {

  sNgeneral:statusNutritionGeneral
  constructor(public service:StatusNutritionGeneralService,
    public serviceKg:KgValueService,
    public serviceSv:SizeValueService,
    public serviceNotification:NotificationService,
    public servicePreference:PersonalReferenceService,
    public serviceGrade:GradeService,
    public dialogRef:MatDialogRef<KgValueRegisterComponent>) { }

    kgValues:Array<any>;
    sizeValues:Array<any>;
    pReferences:Array<any>;
    grades:Array<any>;
  ngOnInit(): void {
    this.service.getStatusNutritionList();
    this.serviceKg.getKgValueList()
    .subscribe(list=>{
      let array=list.map(item=>{
        return{
          id:item.id,
          firstValue:item.firstValue,
          secondValue:item.secondValue
        };
      });
      this.kgValues=new Array(array);
      this.kgValues=array
    
  });
  this.serviceSv.getSizeValueList()
    .subscribe(list=>{
      let array=list.map(item=>{
        return{
          id:item.id,
          firstValue:item.firstValue,
          secondValue:item.secondValue
        };
      });
      this.sizeValues=new Array(array);
      this.sizeValues=array
    });

    this.servicePreference.getPersonReferenceList()
    .subscribe(list=>{
      let array=list.map(item=>{
        return{
          id:item.id,
          age:item.age,
          smallerThan:item.smallerThan,
          greaterThan:item.greaterThan
        };
      });
      this.pReferences=new Array(array);
      this.pReferences=array
    });

    this.serviceGrade.getGradeList()
    .subscribe(list=>{
      let array=list.map(item=>{
        return{
          id:item.id,
          name:item.name,
          description:item.description
        };
      });
      this.grades=new Array(array);
      this.grades=array
    });
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
        const obj=Object.assign({},this.sNgeneral,this.service.form.value)
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
        /*else{
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
        }*/
        }
    }

}
