import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators } from '@angular/forms';
import{Router} from '@angular/router';
import {IssueService} from '../../issue.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm:FormGroup;

  constructor(private issueService:IssueService,private fb: FormBuilder,private route:Router) { 
    this.createForm=this.fb.group({
      Firstname:['',Validators.required],
      Lastname:['',Validators.required],
      phonenumber:'',
      Age:'',
      DOB:'',
      Gender:'',
      Email:'',
      Password:''
         });
  }
  
  addDetails(Firstname,Lastname,phonenumber,DOB,Age,Gender,Email,Password){
    this.issueService.addDetails(Firstname,Lastname,phonenumber,DOB,Age,Gender,Email,Password).subscribe(()=>{
      this.route.navigate(['/Home']);
   });
  }
  ngOnInit(): void {
   
  }

}
