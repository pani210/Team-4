import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import{ FormGroup,FormBuilder,Validators} from '@angular/forms';
import{MatSnackBar } from '@angular/material/snack-bar';
import {CoffeshopsService} from '../../coffeshops.service';

@Component({
  // selector: 'app-editcoffeedata',
  templateUrl: './editcoffeedata.component.html',
  styleUrls: ['./editcoffeedata.component.css']
})
export class EditcoffeedataComponent implements OnInit {
  id:String;
  issue:any={ };
updateForm: FormGroup;

  constructor(private issueService:CoffeshopsService,private router:Router,private route:ActivatedRoute,private snackBar:MatSnackBar,private fb:FormBuilder) {

   }
  ngOnInit(){
    // this.route.params.subscribe(params=>{
    //   this.id=params.id;
    //   this.issueService.getDetailsById(this.id).subscribe(res=>{
    //   this.issue=res;
    //   this.updateForm.get('Name').setValue(this.issue.Name);
    //   this.updateForm.get('GSTno').setValue(this.issue.GSTno);
    //   this.updateForm.get('Description').setValue(this.issue.Description);
    //   this.updateForm.get('Latitude').setValue(this.issue.Latitude);
    //   this.updateForm.get('Longitude').setValue(this.issue.Longitude);
    //   this.updateForm.get('Timings').setValue(this.issue.Timings);
    //   this.updateForm.get('SpecialItems').setValue(this.issue.SpecialItems);
    //   this.updateForm.get('Facilities').setValue(this.issue.Facilities);
    //   this.updateForm.get('Phone_Number').setValue(this.issue.Phone_Number);
    //   this.updateForm.get('Status').setValue(this.issue.Status);
    //   this.updateForm.get('Rating').setValue(this.issue.Rating);
    //   this.updateForm.get('Review').setValue(this.issue.Review); 
    //     });
    // });
  }
  updateDetailsBy(Name,GSTno,Description,Latitude,Longitude,Timings,SpecialItems,Facilities,Phone_Number,Status,Rating,Review){
    this.issueService.updateDetailsBy(this.id,Name,GSTno,Description,Latitude,Longitude,Timings,SpecialItems,Facilities,Phone_Number,Status,Rating,Review).subscribe(()=>{
      this.snackBar.open('updated succesfully','ok',{
        duration:3000
      });
    });

    // this.issueService.updateDetailsBy(this.id,Longitude,Timings,SpecialItems,Facilities).subscribe(()=>{
    //   this.snackBar.open('updated succesfully','ok',{
    //     duration:3000
    //   });
    // });

    // this.issueService.updateDetailsBy(this.id,Phone_Number,Status,Rating,Review).subscribe(()=>{
    //   this.snackBar.open('updated succesfully','ok',{
    //     duration:3000
    //   });
    // });
  }
}
