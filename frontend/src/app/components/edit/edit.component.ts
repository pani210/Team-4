import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute} from '@angular/router';
import{ FormGroup,FormBuilder,Validators} from '@angular/forms';
import{MatSnackBar } from '@angular/material/snack-bar';
import {IssueService} from '../../issue.service';
import{Issue} from '../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id:String;
  issue:any={ };
updateForm: FormGroup;

  constructor(private issueService:IssueService,private router:Router,private route:ActivatedRoute,private snackBar:MatSnackBar,private fb:FormBuilder) {
    this.createForm();
   }
    createForm(){
      this.updateForm=this.fb.group({
        Firstname:['',Validators.required],
        Lastname:['',Validators.required],
        phonenumber:'',
        Age:'',
        DOB:'',
        Gender:'',
        Email:'',
        Password:'',
             });
    }

  ngOnInit(){
    // this.route.params.subscribe(params=>{
    //   this.id=params.id;
    //   this.issueService.getDetailsById(this.id).subscribe(res=>{
    //   this.issue=res;
      // this.updateForm.get('Firstname').setValue(this.issue.Firstname);
      // this.updateForm.get('Lastname').setValue(this.issue.Lastname);
      // this.updateForm.get('phonenumber').setValue(this.issue.phonenumber);
      // this.updateForm.get('Age').setValue(this.issue.Age);
      // this.updateForm.get('DOB').setValue(this.issue.DOB);
      // this.updateForm.get('Gender').setValue(this.issue.Gender);
      // this.updateForm.get('Email').setValue(this.issue.Email);
      // this.updateForm.get('Password').setValue(this.issue.Password);
      // this.updateForm.get('profilePic').setValue(this.issue.profilePic); 
    //     });
    // });
  }
  // updateDetails(Firstname,Lastname,phonenumber,Age,DOB,Gender,Email,Password,profilePic){
  //   this.issueService.updateDetails(this.id,Firstname,Lastname,Age,DOB,Gender,Email,Password,profilePic,'').subscribe(()=>{
  //     this.snackBar.open('updated succesfully','ok',{
  //       duration:3000
  //     });
  //   });
    // this.issueService.updateIssue(Reviews,'','','','','').subscribe(()=>{
      // this.snackBar.open('updated succesfully','ok',{
      //   duration:3000
      // });
  }


