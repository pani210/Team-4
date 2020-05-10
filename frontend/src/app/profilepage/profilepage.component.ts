import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators } from '@angular/forms';
import{Router,ActivatedRoute} from '@angular/router';
import {LoginService} from '../login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Data } from '../coffeeData.model';
import {Issue} from '../issue.model';
import{CoffeshopsService} from '../coffeshops.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  userid:String;
  issue:Data;
  
  userData: Issue;
  issuebar:Data[];
  cid:String;
  uid:String;
  // displayedColumns:[Firstname,Lastname,phonenumber,DOB,Age,Gender,Email]

  constructor(private issueService:LoginService,private router:Router,private route:ActivatedRoute,private snackbar:MatSnackBar,
    private formbuilder:FormBuilder,private issueServiceBar:CoffeshopsService) { }

  ngOnInit(): void {
    this.userid = this.route.snapshot.paramMap.get('id');//calling id
    this.fetchIssues();
    this.fetchIssuesbar()
    this.updatefavbar(this.cid,this.uid);
    this.removefavbar(this.cid,this.uid);
  }
 fetchIssues() { 
  this.issueService.getuserById(this.userid).subscribe((data: Issue) => {
    this.userData = data;
    console.log('requested for user details....');
    console.log(this.userData);      
  });
}
fetchIssuesbar(){
  this.issueServiceBar
  .getDetails()
  .subscribe((data:Data[])=>{
    this.issuebar=data;
    console.log('Data requested....');
    console.log(this.issuebar);
  });
}

favChanged(cid,uid,event){
  console.log('CID=',cid,' uid=',uid);
  console.log(event.checked);
  if (event.checked ==  true){
    console.log("added model success");
    this.updatefavbar(cid,uid) 
  }
  else{      
    console.log("removed model success")
    this.removefavbar(cid,uid) 
  }    
}
updatefavbar(cid,uid){
  this.issueService.updatefavbar(cid,uid).subscribe(data =>{
    console.log(data)
  }),(err)=>{
    console.log(err);
  }
}
removefavbar(cid,uid){
  this.issueService.removefavbar(cid,uid).subscribe(data =>{
    console.log(data)
  }),(err)=>{
    console.log(err); 
  }
}

checkedfunction(cid){
  console.log(this.userData.favouritebars);
  let arraydata=this.userData.favouritebars;
  for (var i = 0; i < Object.keys(arraydata).length; i++) {
    if(arraydata[i]==cid){
      return true;
    }
  }    
}
tracByBarId(index:number, element:any){
  return element._id;
}
}
