import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  planets: any;
  vehicles: any;
  selectedPlanetsIndex = new Array(4).fill(-1);;
  selectedVehiclesIndex = new Array(4).fill(-1);
  timeCalculated = new Array(4).fill(0);
  time = 0;

  constructor(private httpService: HttpService,private router:Router) { }

  ngOnInit() {
    this.getPlanets();
    this.getVehicles();
  }

  getPlanets() {
    this.httpService.getPlanets().subscribe(data => {
      this.planets = data;
    }, function (error) {
      console.log(error);
    })
  }

  getVehicles() {
    this.httpService.getVehicles().subscribe(data => {
      this.vehicles = data;
    }, function (error) {
      console.log(error);
    })
  }

  planetChange() {
    console.log(this);
  }

  showElement(index) {
    if (this.selectedPlanetsIndex.includes(index.toString())) {
      return true;
    }
    else {
      return false;
    }
  }

  vehicleChange(index, vehicleIndex) {
    var previousVehicleIndex = this.selectedVehiclesIndex[index];
    if (previousVehicleIndex >= 0) {
      this.vehicles[previousVehicleIndex].total_no += 1;
    }
    this.time -= this.timeCalculated[index];
    this.selectedVehiclesIndex[index] = vehicleIndex;
    this.vehicles[vehicleIndex].total_no -= 1;
    this.timeCalculated[index] = this.calculateTime(this.planets[this.selectedPlanetsIndex[index]].distance, this.vehicles[this.selectedVehiclesIndex[index]].speed);
    this.time += this.timeCalculated[index];
  }

  disableVehicle(i, v) {
    if (this.vehicles[v].total_no == 0 && this.selectedVehiclesIndex[i] != v) {
      return true;
    }
    else if (this.planets[this.selectedPlanetsIndex[i]].distance > this.vehicles[this.selectedVehiclesIndex[i]].max_distance) {
      return true;
    }
    else {
      return false;
    }
  }

  calculateTime(distance, speed) {
    return distance / speed;
  }

  enableButton() {
    for (var i = 0; i < this.selectedPlanetsIndex.length; i++) {
      if (this.selectedPlanetsIndex[i] < 0 || this.selectedVehiclesIndex[i] < 0) {
        return true;
      }
    }
  }


  findFalcone() {
    var planets = [];
    var vehicles = [];
    var token = "";
    var that=this;
    this.httpService.getToken().subscribe(data => {
      token = data["token"];
      that.selectedPlanetsIndex.forEach(function (el) {
        planets.push(that.planets[el].name);
      });
      that.selectedVehiclesIndex.forEach(function (el) {
        vehicles.push(that.vehicles[el].name);
      });
      that.httpService.findFalcone(token, planets, vehicles).subscribe(result => {
        if(result['error']){
          console.log("Error while getting token , Please try again");
        }
        else if(result['status'] && result['status']== "success"){
          this.httpService.setResult(result['planet_name'],this.time);
          console.log("Success ! Falcone found");
        }
        else if(result['status'] && result['status']=="false"){
          this.httpService.setResult("",0);
          console.log("Failed to find falcone");
        }
        this.router.navigate(['/result']);
      });
    })
  }
}
