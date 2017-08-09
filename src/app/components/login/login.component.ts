import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html'
})
// styleUrls: ['./login.component.css']

export class LoginComponent {
  vm = this;

  constructor(private authentication: AuthenticationService, private router: Router) {
  }

  credentials = {
    email: "",
    password: ""
  };

  onSubmit() {
    this.authentication.login(this.credentials);
    // FIXME: pick better location
  }
}
