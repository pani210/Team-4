import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators } from '@angular/forms';
import{Router} from '@angular/router';
import {LoginService} from '../login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
// import { Data } from '../coffeeData.model';
import {Issue} from '../issue.model';
import {CoffeshopsService} from '../coffeshops.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  iddata:String;
  issue: Issue[];
  value:{};
  createForm:FormGroup;

  constructor( private router: Router,private snackBar:MatSnackBar,private issueService:LoginService,private fb: FormBuilder,private route:Router,
    private coffeeshopsservice:CoffeshopsService) { 
    this.createForm=this.fb.group({
      Email:'',
      Password:''
    })
  }
  userLogin(Email,Password){
    this.issueService.userLogin(Email,Password).subscribe((data:Issue[])=>{
    //  console.log(whichIsVisible(data)[0].id)
    // console.log(data);
    this.coffeeshopsservice.putCurrUser(data['Registrations'][0]);
    this.iddata=data['Registrations'][0]['_id'];
      console.log(this.iddata);

      const id=this.iddata;
      // console.log(this.issue);
      this.snackBar.open('Account Login successfully', 'OK', {duration: 10000});
      this.router.navigate([`/profilepage/${id}`]);
    },(err)=>{
      console.error(err);
      this.snackBar.open('Account Login failure', 'OK', {duration: 10000});   
      // this.router.navigate(['/home']); 
    }
    )
  }
  ngOnInit(): void {

  }

}
