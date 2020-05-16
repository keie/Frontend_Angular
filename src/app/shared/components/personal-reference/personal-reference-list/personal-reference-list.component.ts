import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from '../../notification/notification.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonalReference } from '../models/PersonalReference';
import { PersonalReferenceService } from '../personal-reference.service';
import { PersonalReferenceRegisterComponent } from '../personal-reference-register/personal-reference-register.component';

@Component({
  selector: 'app-personal-reference-list',
  templateUrl: './personal-reference-list.component.html',
  styleUrls: ['./personal-reference-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PersonalReferenceListComponent implements OnInit {
  
  pReferences: PersonalReference[]=[]
  displayedColumns:string[]=['id','age','greaterThan','smallerThan','gender']
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  isVisible= false;
  constructor(private pReferenceService:PersonalReferenceService, 
    private dialog:MatDialog,private notificationService:NotificationService) {}

    ageFilter=new FormControl();
    genderFilter=new FormControl();
    smallerThanFilter=new FormControl();
    greaterThanFilter=new FormControl();

    filteredValues={age:"",gender:"",smallerThan:"",greaterThan:""}
  
    listData:MatTableDataSource<any>;



  ngOnInit(): void {
    this.reload();
  }

  reload(){
   // this.isVisible=true;
    this.pReferenceService.getPersonReferenceList().subscribe(
      list=>{
        let array=list.map(item=>{
          if(item.boolDelete!=1){
            return{
              id:item.id,
              age:item.age,
              greaterThan:item.greaterThan,
              smallerThan:item.smallerThan,
              gender:item.gender
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

  applyFilter(){
    
    this.ageFilter.valueChanges.subscribe(ageFilterValue=>{
      this.filteredValues['age']=ageFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })

    this.genderFilter.valueChanges.subscribe(genderFilterValue=>{
      this.filteredValues['gender']=genderFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })

    this.smallerThanFilter.valueChanges.subscribe(smallerThanFilterValue=>{
      this.filteredValues['smallerThan']=smallerThanFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })

    this.greaterThanFilter.valueChanges.subscribe(greaterThanFilterValue=>{
      this.filteredValues['greaterThan']=greaterThanFilterValue;
      this.listData.filter=JSON.stringify(this.filteredValues);
    })
    this.listData.filterPredicate=this.customFilterPredicate();
  }
  
  customFilterPredicate(){
    const myFilterPredicate=function(data:PersonalReference,filter:string):boolean{
      let searchString=JSON.parse(filter);
      let ageFound=data.age.toString().trim().toLowerCase().indexOf(searchString.age)!==-1
      let genderFound=data.gender.toString().trim().toLowerCase().indexOf(searchString.gender.toLowerCase())!==-1
      let samellerThanFound=data.smallerThan.toString().trim().toLowerCase().indexOf(searchString.smallerThan)!==-1
      let greaterThanFound=data.greaterThan.toString().trim().toLowerCase().indexOf(searchString.greaterThan)!==-1
      if(searchString.topFilter){
        return ageFound || genderFound || samellerThanFound || greaterThanFound
      }else{
        return ageFound && genderFound && samellerThanFound && greaterThanFound
      }
    }
    return myFilterPredicate
  }

  onCreate(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.height="75%";
    this.dialog.open(PersonalReferenceRegisterComponent,dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.reload();
      });
  }

  

}
