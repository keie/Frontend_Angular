import { Component, OnInit, ViewChild } from '@angular/core';
import { KgValue } from '../models/kgvalue';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { KgValueService } from '../kg-value.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../notification/notification.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-kg-value-list',
  templateUrl: './kg-value-list.component.html',
  styleUrls: ['./kg-value-list.component.css']
})
export class KgValueListComponent implements OnInit {
  
  kgValues:KgValue[]=[]
  displayedColumns: string[] = ['actions','id','firstValue', 'secondValue'];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  isVisible= false;
  constructor(private kgService:KgValueService) { }

    firstValueFilter=new FormControl();
    secondValueFilter=new FormControl();

    filteredValues={id:"",firstValue:"",secondValue:""}
  
    listData:MatTableDataSource<any>;

    reload(){
      this.isVisible=true;
      this.kgService.getKgValueList().subscribe(
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
    const myFilterPredicate=function(data:KgValue,filter:string):boolean{
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
