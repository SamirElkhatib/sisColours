import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {

  constructor(private http: Http, private router: Router) { }

  // Store the token locally
  saveToken(token){
    // TODO: Transfer to cookie storage or session?
    // TODO: change token local storage name?
    window.localStorage["sisColours-Token"] = token;
  };

  // Retrieve token from local storage
  getToken(){
    return window.localStorage["sisColours-Token"];
  };

  // Destroy token
  logout(){
    window.localStorage.removeItem("sisColours-Token");
  };

  // Return true if token exists and expiry date not reached
  isLoggedIn(){
    let token = this.getToken();
    if(token){
      // Split the part of the token where the payload is
      let payload = token.split(".")[1];
      // FIXME: Not supported by IE9 => check polyfill?
      // atob() function decodes Base64 string
      payload = window.atob(payload);
      payload = JSON.parse(payload);
      // return true if expiry not reached
      return (payload.exp > Date.now()/1000);
    }
  }

  // returns email and name of user
  getUser(){
    if (this.isLoggedIn){
      let token = this.getToken();
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload);
      // FIXME: What other information should we return?
      return {
        email: payload.email,
        name: payload.name
      }
    }
  }

  // FIXME: Handle router navigation somewhere else (in the components) and remove Router from this service
  // NOTE: I added a callback to register and login
  register(user){
    return this.http.post('/api/register', user).subscribe(response => {
      this.saveToken(response.json().token);
      this.router.navigate(['/home']);
    });
  }

  login(user){
    return this.http.post('/api/login', user).subscribe(response => {
      this.saveToken(response.json().token);
      this.router.navigate(['/home']);
    })
  }
}
