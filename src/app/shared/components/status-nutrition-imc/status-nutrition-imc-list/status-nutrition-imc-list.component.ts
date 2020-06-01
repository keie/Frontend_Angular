import { Component, OnInit, ViewChild } from '@angular/core';
import { imc } from '../models/imc';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../notification/notification.service';
import { StatusNutritionImcService } from '../status-nutrition-imc.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-status-nutrition-imc-list',
  templateUrl: './status-nutrition-imc-list.component.html',
  styleUrls: ['./status-nutrition-imc-list.component.css']
})
export class StatusNutritionImcListComponent implements OnInit {


  imcValues:imc[]=[]
  displayedColumns: string[] = ['actions','id','firstValue', 'secondValue'];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  isVisible= false;
  constructor(private imcService:StatusNutritionImcService, 
    private dialog:MatDialog,private notificationService:NotificationService) { }
    
    firstValueFilter=new FormControl();
    secondValueFilter=new FormControl();

    filteredValues={id:"",firstValue:"",secondValue:""}
  
    listData:MatTableDataSource<any>;
    
    reload(){
      this.isVisible=true;
      this.imcService.getImcList().subscribe(
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
    const myFilterPredicate=function(data:imc,filter:string):boolean{
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

}
