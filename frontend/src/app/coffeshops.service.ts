import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CoffeshopsService {
  currentuser:any;

  uri='http://localhost:5000';

  constructor(private http:HttpClient) { }
  
  getcuruser(){
    return this.currentuser;
  }
  putCurrUser(userobj)
  {
    this.currentuser=userobj
  }




  getDetails(){
    return this.http.get(`${this.uri}/coffeeData`);
  }
  coffeeData(id){
    return this.http.get(`${this.uri}/coffeeData/${id}`);
  }
  updateDetailsBy(id,Name,GSTno,Description,Latitude,Longitude,Timings,SpecialItems,Facilities,Phone_Number,Status,Rating,Review){
    const t={
      // id:id,
      Name:Name,
      GSTno:GSTno,
      Description:Description,
      Latitude:Latitude,
      Longitude:Longitude,
      Timings:Timings,
      SpecialItems:SpecialItems,
      Facilities:Facilities,
      Phone_Number:Phone_Number,
      Status:Status,
      Rating:Rating,
      Review:Review
    };
    return this.http.get(`${this.uri}/coffeeData/update${id}`);

  }

  getcoffeeshoplocation(){
    return this.http.get(`${this.uri}/nearby`);
  }

  getcoffeeshoplocationById(id) {
    console.log('request sending to coffeeshops :'+`${this.uri}/coffeeshopmaps/${id}`)
    return this.http.get(`${this.uri}/coffeeshopmaps/${id}`);
  } 
  addreview(sid,uname,review){
    const issue={
      review:review,
      uname:uname
    }
    return this.http.post(`${this.uri}/coffeeshopdata/addreview/${sid}`,issue); 
  }
  addrate(value,shopid){
    const issue={
      value:value
    }
    return this.http.post(`${this.uri}/coffe/addrating/${shopid}`,issue);
  }
}