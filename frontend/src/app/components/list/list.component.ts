import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import{Issue} from '../../issue.model';

import {IssueService} from '../../issue.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues:Issue[];
  displayedColumns=['Firstname','Lastname','phonenumber','Age','DOB','Gender','Email','Actions'];
  constructor(private issueService:IssueService,private router:Router) { }

  ngOnInit(): void {
    // this.issueService.getIssues().subscribe((issues)=>{
    //   console.log(issues);   
    //    })
    this.fetchIssues();  
  }
  fetchIssues(){
    this.issueService
      .getDetailsById('id')
      .subscribe((data:Issue[])=>{
        this.issues=data;
        console.log('Data requested');
        console.log(this.issues);
      });
  }
  // editData(id){
  //   this.router.navigate([`/edit/${id}`]);
  // }
  deletedetails(id){
    this.issueService.deletedetails(id).subscribe(()=>{
      this.fetchIssues();
    });
  }

}
