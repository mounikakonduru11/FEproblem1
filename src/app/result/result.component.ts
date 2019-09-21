import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/services/http.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  result;
  constructor(private http : HttpService) { }

  ngOnInit() {
    this.result=this.http.getResult();
  }

}
