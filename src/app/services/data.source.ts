/**
 * Created by Samir Elkhatib on 7/7/2017.
 *
 * This model explicitly plugs data into the system as a dummy source
 * Should be implemented later as a http database connection
 *
 */

// TODO: Request data from server: implement REST API
// Currently static data...
import {Injectable} from "@angular/core";
import {Http, Request, RequestMethod, Response, Headers} from "@angular/http"
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';

import {Course} from "../models/course.model";
import {AuthenticationService} from "./authentication.service";

// TODO: Transfer this information to global config file?
const PORT = 3500;
const PROTOCOL = "http";

// TODO: fix Url for real database before deploying

@Injectable()
export class dataSource {
  baseUrl: string;
  private data: Course[];

  constructor(private http: Http, private authentication: AuthenticationService) {
    // this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    // FIXME: 3500 used only for json-server development
    // this.baseUrl = `http://localhost:3500/`;
    this.baseUrl = `http://localhost:3000/api/`;
  }

  getCourses(): Observable<Course[]> {
    return this.sendRequest(RequestMethod.Get, "courses");
  }

  private sendRequest(verb: RequestMethod, url: string, body?: Course): Observable<Course[]> {
    return this.http.request(new Request({
      method: verb,
      headers: this.getHeaders(),
      url: this.baseUrl + url,
      body: body
    })).map(response => response.json());
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + this.authentication.getToken());
    return headers;
  }
}
