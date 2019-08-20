import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  planets : any;
  selectedPlanets=["","","",""];
  constructor(private httpService : HttpService) { }

  ngOnInit() {
    this.getPlanets();
  }

  getPlanets(){
    this.httpService.getPlanets().subscribe(data=>{
      this.planets=data;
    })
  }

  onPlanetChange(index,event){
    this.selectedPlanets[index]=event.target.value;
    console.log(this.selectedPlanets);
  }

  showElement(destination,index){
    for(var i=0;i<this.selectedPlanets.length;i++){
      if(destination!=index){
        if(index==this.selectedPlanets[i]){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    }
  }

}
