import { Component, OnInit, ViewChild } from '@angular/core';
import { SizeValue } from '../models/sizeValue';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SizeValueService } from '../size-value.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from '../../notification/notification.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { KgValueRegisterComponent } from '../../kg-value/kg-value-register/kg-value-register.component';
import { SizeValueRegisterComponent } from '../size-value-register/size-value-register.component';

@Component({
  selector: 'app-size-value-list',
  templateUrl: './size-value-list.component.html',
  styleUrls: ['./size-value-list.component.css']
})
export class SizeValueListComponent implements OnInit {

  sizeValues:SizeValue[]=[]
  displayedColumns: string[] = ['actions','id','firstValue', 'secondValue'];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  isVisible= false;

  constructor(private sizeValueService:SizeValueService,
    private dialog:MatDialog,private notificationService:NotificationService) { }
    
    firstValueFilter=new FormControl();
    secondValueFilter=new FormControl();

    filteredValues={id:"",firstValue:"",secondValue:""}
  
    listData:MatTableDataSource<any>;

    reload(){
      this.isVisible=true;
      this.sizeValueService.getSizeValueList().subscribe(
        list=>{
          let array=list.map(item=>{
            if(item.boolDelete!=1){
              return{
                id:item.id,
                firstValue:item.firstValue,
                secondValue:item.secondValue
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
    this.reload();
  }

  applyFilter() {
    this.firstValueFilter.valueChanges.subscribe(firsValueFilterValue=>{
      this.filteredValues['firstValue']=firsValueFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })
    this.secondValueFilter.valueChanges.subscribe(secondValueFilterValue=>{
      this.filteredValues['secondValue']=secondValueFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })
    this.listData.filterPredicate=this.customFilterPredicate();
  }

  customFilterPredicate(){
    const myFilterPredicate=function(data:SizeValue,filter:string):boolean{
      let searchString=JSON.parse(filter);
      let firstValueFound=data.firstValue.toString().trim().toLowerCase().indexOf(searchString.firstValue)!==-1
      let secondValueFound=data.secondValue.toString().trim().indexOf(searchString.secondValue)!==-1
      
      if(searchString.topFilter){
        return firstValueFound || secondValueFound 
      }else{
        return firstValueFound && secondValueFound 
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
    this.dialog.open(SizeValueRegisterComponent,dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.reload();
      });
  }

  onEdit(row){
    this.sizeValueService.populateForm(row);
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.height="75%";
    console.log(this.sizeValueService.form)
    this.dialog.open(SizeValueRegisterComponent,dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.reload();
      });
  }

  onDelete(data){
    if(confirm("Estas seguro de eliminar este registro?")){
      this.sizeValueService.deleteSizeValue(data)
      .subscribe(res=>{
        this.reload();
      });
      this.notificationService.warn("Registro borrado con exito");
    }
  }

  

}
