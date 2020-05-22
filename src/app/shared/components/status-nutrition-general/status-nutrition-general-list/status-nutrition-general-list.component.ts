import { Component, OnInit, ViewChild } from '@angular/core';
import { statusNutritionGeneral } from '../models/statusNutritionGeneral';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { StatusNutritionGeneralService } from '../status-nutrition-general.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from '../../notification/notification.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { StatusNutritionGeneralRegisterComponent } from '../status-nutrition-general-register/status-nutrition-general-register.component';

@Component({
  selector: 'app-status-nutrition-general-list',
  templateUrl: './status-nutrition-general-list.component.html',
  styleUrls: ['./status-nutrition-general-list.component.css']
})
export class StatusNutritionGeneralListComponent implements OnInit {

  statusNvalues:statusNutritionGeneral[]=[]
  displayedColumns: string[] = ['actions','id','kgValues', 'sizeValues','smaller','pReferencesAge','pReferencesGender','gradesName','gradesDescription'];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  isVisible= false;
  colorDeficit='red';
  colorNormal='#00BFFF';
  colorExc='orange';
  colorDeficitL='yellow';
  colorNormalL='white';
  colorExcL='white';
  constructor(private statusNservice:StatusNutritionGeneralService, 
    private dialog:MatDialog,private notificationService:NotificationService) { }
  
  genderFilter=new FormControl();
  ageFilter=new FormControl();
  filteredValues={id:"",gender:"",age:""}
  
    listData:MatTableDataSource<any>;

    getColorBackground(row){
      
      if(row=='NORMAL'){
        return this.colorNormal;
      }
      if(row=='EXCESO'){
        this.colorExc;
      }
      return this.colorDeficit;
    }
    getColorL(row){
      if(row=='DEFICIT'){
       return this.colorDeficitL;
      }
      if(row=='NORMAL'){
        return this.colorNormalL;
       }
      return this.colorExcL;
    }
  reload(){
    this.isVisible=true;
    this.statusNservice.getStatusNutritionList().subscribe(
      list=>{
        let array=list.map(item=>{
          if(item.boolDelete!=1){
            return{
              id:item.id,
              pReferences:item.pReferences,
              kgValues:item.kgValues,
              sizeValues:item.sizeValues,
              grades:item.grades
            };
          }
        });
        array = array.filter(function(dato){
          return dato != undefined
        });
        this.listData=new MatTableDataSource(array);
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator;
        this.isVisible=false;
      });
  }

  ngOnInit(): void {
    this.reload()
  }

  applyFilter() {
    this.genderFilter.valueChanges.subscribe(genderFilterValue=>{
      this.filteredValues['gender']=genderFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })
    this.ageFilter.valueChanges.subscribe(ageFilterValue=>{
      this.filteredValues['age']=ageFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })
    this.listData.filterPredicate=this.customFilterPredicate();
  }

  customFilterPredicate(){
    const myFilterPredicate=function(data:statusNutritionGeneral,filter:string):boolean{
      let searchString=JSON.parse(filter);
      let ageFound=data.grades.age.toString().trim().toLowerCase().indexOf(searchString.firstValue)!==-1
      let genderFound=data.grades.gender.toString().trim().indexOf(searchString.secondValue)!==-1
      
      if(searchString.topFilter){
        return ageFound || genderFound 
      }else{
        return ageFound && genderFound 
      }
    }
    return myFilterPredicate;
  }
  onCreate(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.height="75%";
    this.dialog.open(StatusNutritionGeneralRegisterComponent,dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.reload();
      });
  }

  onDelete(data){
    if(confirm("Estas seguro de eliminar este registro?")){
      this.statusNservice.deleteStatusNutritionGeneral(data)
      .subscribe(res=>{
        this.reload();
      });
      this.notificationService.warn("Registro borrado con exito");
    }
  }

}
