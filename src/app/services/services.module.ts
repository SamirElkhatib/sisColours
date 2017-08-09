import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from "@angular/http";
import {slotsRepository} from "./slots.repository";
import {dataSource} from "./data.source";
import {courseRepository} from "./courses.repository";
import {AuthenticationService} from "./authentication.service";

@NgModule({
  imports: [CommonModule, HttpModule],
  declarations: [],
  bootstrap: [],
  providers: [slotsRepository, dataSource, courseRepository, AuthenticationService]
})
export class ServicesModule { }
