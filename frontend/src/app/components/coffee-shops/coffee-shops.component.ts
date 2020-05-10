import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import{Data} from '../../coffeeData.model';
import{CoffeshopsService} from '../../coffeshops.service'

@Component({
  selector: 'app-coffee-shops',
  templateUrl: './coffee-shops.component.html',
  styleUrls: ['./coffee-shops.component.css']
})
export class CoffeeShopsComponent implements OnInit {
  searchTerm:String;
  issue: Data[];
  displayedColumns=['name','rating','timing','actions'];

  // constructor(private DataService:Data,private router:Router) { }
  constructor(private issueService:CoffeshopsService, private router:Router) { }

  ngOnInit(): void {
    // this.issueService.getIssues().subscribe((issues)=>{
    //   console.log(issues);   
    //    })
    this.fetchIssues();  
  }
  fetchIssues(){
    this.issueService
    .getDetails()
    .subscribe((data:Data[])=>{
      this.issue=data;
      console.log('Data requested....');
      console.log(this.issue);
    });
  }
  coffeeData(id) {
    this.router.navigate([`/coffeeData/${id}`]);
     
    // console.log([`/coffeeData/${id}`]);
  }
}
