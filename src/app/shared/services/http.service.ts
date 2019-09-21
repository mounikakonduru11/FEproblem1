import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment} from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  resultObj={
  }
  constructor(private http : HttpClient) { }

  getPlanets(){
    var planetsUrl = environment.apiBaseUrl +"planets";
    return this.http.get(planetsUrl);
  }

  getVehicles(){
    var vehiclesUrl = environment.apiBaseUrl +"vehicles";
    return this.http.get(vehiclesUrl);
  }

  getToken(){
    var tokenUrl= environment.apiBaseUrl +"token";
    var options= {
      headers : new HttpHeaders({
        'Accept':'application/json'
      })
    }
    return this.http.post(tokenUrl,{},options);
  }

  findFalcone(token,planets,vehicles){
    var falconeUrl =environment.apiBaseUrl+"find";
    var requestBody={
      token : token,
      planet_names : planets,
      vehicle_names : vehicles
    };
    var options= {
      headers : new HttpHeaders({
        'Accept':'application/json'
      })
    }
    return this.http.post(falconeUrl,requestBody,options);
  }

  setResult(planet,time){
    if(planet){
      this.resultObj['status']=true;
      this.resultObj['planet_name']=planet;
      this.resultObj['time']=time;
    }
    else{
      this.resultObj['status']=false;
    }
  }

  getResult(){
    return this.resultObj;
  }

  resetResultObj(){
    this.resultObj={};
  }
}
