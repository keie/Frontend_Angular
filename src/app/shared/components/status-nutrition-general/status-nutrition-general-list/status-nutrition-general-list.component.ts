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
import { Grade } from '../../grade/models/Grade';
import { PersonalReference } from '../../personal-reference/models/PersonalReference';

@Component({
  selector: 'app-status-nutrition-general-list',
  templateUrl: './status-nutrition-general-list.component.html',
  styleUrls: ['./status-nutrition-general-list.component.css']
})
export class StatusNutritionGeneralListComponent implements OnInit {

  statusNvalues:statusNutritionGeneral[]=[]
  displayedColumns: string[] = ['actions','id','kgValues', 'sizeValues','smaller','pReferencesAge','pReferencesGender','gradesName','gradesDescription','pregnancy'];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  isVisible= false;
  colorDeficit='red';
  colorNormal='#00BFFF';
  colorExc='#FF7133';
  colorDeficitL='yellow';
  colorNormalL='white';
  colorExcL='white';
  constructor(private statusNservice:StatusNutritionGeneralService, 
    private dialog:MatDialog,private notificationService:NotificationService) { }
  
  genderFilter=new FormControl();
  nameFilter=new FormControl();
  filteredValues={gender:"",name:""}
  
  listData:MatTableDataSource<any>;

    getColorBackground(row){
      
      if(row=='NORMAL'){
        return this.colorNormal;
      }
      if(row=='DEFICIT'){
        return this.colorDeficit;
      }
      return this.colorExc;
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
    //this.isVisible=true;
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
    this.nameFilter.valueChanges.subscribe(nameFilterValue=>{
      this.filteredValues['name']=nameFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })
    
    this.listData.filterPredicate=this.customFilterPredicate();
  }

  customFilterPredicate(){
    const myFilterPredicate=function(data:statusNutritionGeneral,filter:string):boolean{
      let searchString=JSON.parse(filter);
      let genderFound=data.grades[0].gender.toString().trim().indexOf(searchString.gender)!==-1
      let nameFound=data.grades[0].name.toString().trim().indexOf(searchString.name)!==-1
      
      if(searchString.topFilter){
        return  genderFound || nameFound
      }else{
        return  genderFound && nameFound
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
