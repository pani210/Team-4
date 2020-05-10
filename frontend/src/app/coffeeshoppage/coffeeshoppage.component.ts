import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import{Data} from '../coffeeData.model';
import{CoffeshopsService} from '../coffeshops.service';
import {MatSnackBar} from '@angular/material/snack-bar';
// import {coffeeshoppage} from '../coffeshops.service';
// import  * as L from 'leaflet';

@Component({
  selector: 'app-coffeeshoppage',
  templateUrl: './coffeeshoppage.component.html',
  styleUrls: ['./coffeeshoppage.component.css']
})

export class CoffeeshoppageComponent implements OnInit {

  ratediv:boolean=true;

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 0;
  showTicks = false;
  step = 0.2;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;
  
  isCollapsed:boolean=true;
  currentuser:any;

  searchTerm:String;
  id: String;
  issue:Data;
  reviewlayout:any;
  displayedCoulmns = ['name','gstno','description','latitude','longitude','rating','review','timing','specialitems','facilities','contactnumber','email','status'];
      constructor(private issueService: CoffeshopsService,private router: Router,
    private route: ActivatedRoute,private snackBar:MatSnackBar) { }

     toggleCollapse(){
      if(this.currentuser == null){
       console.log("user not Logged In");
       this.router.navigate([`/userLogin`]);
      }
      else{     
        console.log("user successfully Logged In");    
        this.isCollapsed=!this.isCollapsed;
      }
    }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.fetchIssues();
    this.currentuser=this.issueService.getcuruser();
  }
  fetchIssues() {
    this.issueService.coffeeData(this.id).subscribe((data:Data) => {
      this.issue = data;
      console.log('Data requested....');

      this.reviewlayout=data['review'];
      console.log(this.reviewlayout);
      
      console.log(this.issue);
      console.log(data);     
    });
  }
  barmap(id){
    this.router.navigate([`/coffeeshoplocation/${id}`]);
  }

  addreview(bardata,currentusername,review){
    
    this.issueService.addreview(bardata,currentusername,review).subscribe(data =>{
      console.log(data)
      this.snackBar.open('Review Added Successfully', 'OK', {duration: 7000});
    }),(err)=>{
      console.log(err);
      this.snackBar.open('Unable to Add Review, Try again Later', 'OK', {duration: 7000});
    }
  }



  rateadd(value,shopid){ 
    console.log(value,shopid);
    this.issueService.addrate(value,shopid).subscribe(data =>{
      console.log(data)
      this.snackBar.open('Successfully rated', 'OK', {duration: 7000});
    }),(err)=>{
      console.log(err);
      this.snackBar.open('Could not able to rate, Try again Later', 'OK', {duration: 7000});
    }
  }
  ratedivdsipaly(){
    if(this.currentuser == null){
      console.log("user not login");
      this.router.navigate([`/userLogin`]);
     }
     else{
            
       console.log("login successfully");    
       this.ratediv=!this.ratediv;
     }
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }

}