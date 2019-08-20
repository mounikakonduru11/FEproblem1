import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment} from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  getPlanets(){
    var planetsUrl =environment.apiBaseUrl +"planets";
    return this.http.get(planetsUrl);
  }
}
