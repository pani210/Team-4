import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri='http://localhost:5000';

  constructor(private http:HttpClient) { }

  getDetails(){
    return this.http.get(`${this.uri}/Registrations`);
  }
  getDetailsById(id){
    return this.http.get(`${this.uri}/Registrations/${id}`);
  }

  addDetails(Firstname,Lastname,phonenumber,DOB,Age,Gender,Email,Password){
    const DetailsList={
      Firstname: Firstname,
      Lastname: Lastname,
      phonenumber: phonenumber,
      DOB: DOB,
      Age:Age,
      Gender:Gender,
      Email:Email,
      Password:Password
    };
      return this.http.post(`${this.uri}/Registrations/signup`,DetailsList);
  }
  // updateDetails(id,Firstname,Lastname,phonenumber,DOB,Age,Gender,Email,Password,profilePic){
  //   const details={
  //     Firstname: Firstname,
  //     Lastname: Lastname,
  //     phonenumber: phonenumber,
  //     DOB: DOB,
  //     Age:Age,
  //     Gender:Gender,
  //     Email:Email,
  //     Password:Password,
  //     profilePic:profilePic
  //   };
  //     return this.http.post(`${this.uri}/Registrations/update/${id}`,details);
  // }

  deletedetails(id){
    return this.http.get(`${this.uri}/Registrations/delete/${id}`);
  }
}
