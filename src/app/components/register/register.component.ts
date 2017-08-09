import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  // selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  // FIXME: change vm to something more meaningful and change location to router?
  public vm = this;

  constructor(private authentication: AuthenticationService, private router: Router) {
  }

  credentials = {
    name: "",
    email: "",
    password: ""
  };

  onSubmit() {
    this.authentication.register(this.credentials);
    // FIXME: pick better location
  }
}
