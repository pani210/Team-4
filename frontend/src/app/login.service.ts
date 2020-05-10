import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri='http://localhost:5000';

  constructor(private http:HttpClient) { }
  userLogin(Email,Password){
    const listLog={
      Email:Email,
      Password:Password
         };
      return this.http.post(`${this.uri}/Login`,listLog);
  }
  getuserById(id) {
    console.log('Sending request to :'+`${this.uri}/Registrations/${id}`)
    return this.http.get(`${this.uri}/Registrations/${id}`);
  }

  updatefavbar(shopid,uid){
    const issue={
      shopid:shopid
    }
    return this.http.post(`${this.uri}/userprofile/updatefavbar/${uid}`,issue);
  }
  removefavbar(shopid,uid){
    const issue={
      shopid:shopid
    }
    return this.http.post(`${this.uri}/userprofile/removefavbar/${uid}`,issue);
  }
  checkbar(cid,uid){
    const issue={
      uid:uid
    }
    return this.http.post(`${this.uri}/userprofile/findfavbar/${uid}`,issue);
  }
}
