import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CoffeshopsService} from '../coffeshops.service';
import {Data} from '../coffeeData.model';

import * as L from "leaflet";

@Component({
  selector: 'app-shopsnearby',
  templateUrl: './shopsnearby.component.html',
  styleUrls: ['./shopsnearby.component.css']
})
export class ShopsnearbyComponent implements OnInit {
  
  issue: Data;
  userlatitude:String;
  userlongitude:String;
  p={}


  constructor(private issueService:CoffeshopsService, private router:Router) { }

  ngOnInit(): void {
    this.fetchcoffeeshops(); 
  }

  fetchcoffeeshops(){
    this.issueService.getcoffeeshoplocation()
    .subscribe((data:Data)=>{ 
      this.issue=data;
      console.log('Data requested....');
      console.log(this.issue);
      
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          var p={
            userlatitude:position.coords.latitude,
            userlongitude:position.coords.longitude
          }
          const mymap = L.map('mapid').setView([position.coords.latitude,position.coords.longitude], 13);
          var marker = new L.marker([position.coords.latitude,position.coords.longitude]);
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
           
        for(var i=0;i<Object.keys(data).length;i++){ 
          console.log(data[i].Latitude) ;
          var marker = new L.marker([data[i].latitude,data[i].longitude])
           .bindPopup(data[i].Name) .addTo(mymap); 
          }
        console.log(data);
        })
      }
      else{
        console.log("error location")
      }
    })
  }
}
