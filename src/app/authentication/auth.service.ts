import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; /*to navigate*/
import jwtDecode from 'jwt-decode'; /*to decode the token*/
import { BehaviorSubject, Observable } from 'rxjs'; /*to subscribe on currentUserData property*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*currentUserData :BehaviorSubject to subscribe to control authentication in navbar*/
  currentUserData: any = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    //to save user data and not login again after every refresh 
    //if token exist in localStorage , decode it and save it in currentUserData property
    if (localStorage.getItem('currentUser')) {
      this.saveCurrentUserData();
    }
  }

  //post registerData
  postRegistration(registerData: object): Observable<any> {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signup`, registerData);
  }
  //post loginData
  postLogin(loginData: object): Observable<any> {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signin`, loginData);
  }

  //method to decode the token which saved in local storage and save it in currentUserData 
  saveCurrentUserData() {
    let encodedToken: any = localStorage.getItem("currentUser");
    let decodedToken = jwtDecode(encodedToken);
    this.currentUserData.next(decodedToken);
  }

  //logOut method : currentUserData=null then remove saved token then navigate to login page 
  logOut() {
    this.currentUserData.next(null);
    localStorage.removeItem('currentUser');
    this._Router.navigate(['/login']);
  }
}
