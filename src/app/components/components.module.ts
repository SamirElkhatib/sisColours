import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from "@angular/forms";

import {SearchComponent} from "./home/search/search.component";
import {ScheduleComponent} from "./home/schedule/schedule.component";
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomepageGuard} from "../homepage.guard";
import { HomeComponent } from './home/home.component';


// TODO: Set better routes
// Defining application routes

//
const appRoutes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [HomepageGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: '/login'}
];

// Note: RouterModule.forRoot sets routes in the root directory
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes), FormsModule],
  declarations: [SearchComponent, ScheduleComponent, RegisterComponent, LoginComponent, HomeComponent],
  exports: [SearchComponent, ScheduleComponent, RegisterComponent, LoginComponent, HomeComponent]
})
export class ComponentsModule {
}
