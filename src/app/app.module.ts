import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ComponentsModule} from "./components/components.module";
import {ServicesModule} from "./services/services.module";
import {HomepageGuard} from "./homepage.guard";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, ComponentsModule, ServicesModule, RouterModule],
  providers: [HomepageGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
