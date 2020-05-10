import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {CoffeshopsService} from '../coffeshops.service';
import {Data} from '../coffeeData.model';

import * as L from "leaflet";

@Component({
  // selector: 'app-coffeeshoplocation',
  templateUrl: './coffeeshoplocation.component.html',
  styleUrls: ['./coffeeshoplocation.component.css']
})
export class CoffeeshoplocationComponent implements OnInit {
  // id:String;
  // coffeeshoplocation:Data[];
  // position:{};

  // constructor(private coffeeshopsservice:CoffeshopsService,private router:Router,private route:ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.id=this.route.snapshot.paramMap.get('id');
  //   this.fetchIssues()
  // }
  // fetchIssues(){
  //   this.coffeeshopsservice.getcoffeeshoplocationById('id').subscribe((data:Data[])=>{
  //     this.coffeeshoplocation = data;
  //     console.log('Data requested....');
  //     console.log(this.coffeeshoplocation);
  //     console.log(data);
  //     this.fetchmap();
  //   });
  // }

  // fetchmap(){
  //   if(navigator.geolocation){
  //     navigator.geolocation.getCurrentPosition(function(position){
  //       console.log(position);
 
  //     })
  //   }
  //     else{
  //       console.log("location error");
  //     }
      // const mymap = L.map('mapid').setView([this.coffeeshoplocation.latitude,this.coffeeshoplocation.longitude], 13);
      //   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      //   maxZoom: 18,
      //   id: 'mapbox/streets-v11',
      //   tileSize: 512,
      //   zoomOffset: -1,
      //   accessToken:'pk.eyJ1Ijoia29kYW5kYTI4IiwiYSI6ImNrOW1raW9sMDBla2QzZHJ0Z2Iycm04YXgifQ.BP9hgGBjXaWnk39aieOpPg'
      //   }).addTo(mymap); 

      //   var marker = L.marker([this.coffeeshoplocation.Latitude, this.coffeeshoplocation.Longitude]).addTo(mymap);
      //     marker.bindPopup(this.coffeeshoplocation.Name).openPopup();      
      // }


  id: String;
  issue:Data;
  displayedCoulmns = ['Name','GSTno','Description','Latitude','Longitude','Rating','Review','Timing','SpecialItems','Facilities','Contactnumber','Email','Status'];
      constructor(private issueService: CoffeshopsService,private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    // this.fetchIssues();
    this.issueService.coffeeData(this.id).subscribe((data:Data) => {
      this.issue = data;
      console.log('Data requested....');
      console.log(this.issue);
      console.log(data);
      console.log(this.issue.latitude)

      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          var p={
            userlatitude:position.coords.latitude,
            userlongitude:position.coords.longitude
          }
          const mymap = L.map('mapid').setView([position.coords.latitude,position.coords.longitude], 13);
          // var marker = new L.marker([position.coords.latitude,position.coords.longitude]);
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia29kYW5kYTI4IiwiYSI6ImNrOW1raW9sMDBla2QzZHJ0Z2Iycm04YXgifQ.BP9hgGBjXaWnk39aieOpPg'
        }).addTo(mymap);   
        var marker = new L.marker([position.coords.latitude,position.coords.longitude])
        .bindPopup("You were here") .addTo(mymap);
        var circle = L.circle([position.coords.latitude, position.coords.longitude], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
      }).addTo(mymap);
      var marker = new L.marker([data.latitude,data.longitude])
      .bindPopup(data.name) .addTo(mymap);
        // for(var i=0;i<Object.keys(data).length;i++){ 
        //   console.log(data[i].Latitude) ;
        //   var marker = new L.marker([data[i].latitude,data[i].longitude])
        //    .bindPopup(data[i].Name) .addTo(mymap); 
        //   }
        console.log(data);
        })
      }
      else{
        console.log("error location")
      }
  //   })
  // }

      
    
    })
  }
}
 