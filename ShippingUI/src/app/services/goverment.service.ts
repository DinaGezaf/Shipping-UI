import { Goverment } from './../models/Goverment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GovermentService {

  constructor(private http: HttpClient) { }

  GetAllGovernment() {

    return this.http.get('http://localhost:5250/api/Goverment/Getall');


  }


  EditGovernment(GovermentId:number,Goverment:Goverment){
    return this.http.put(`https://localhost:44355/api/Goverment/update/${GovermentId}`,Goverment);
  }

  // AddGovernment(Government: Goverment) {

  //   this.http.post('https://localhost:44355/api/Goverment/Add', Goverment);


  // }


  getGovernmentById(GovernmentId: number) {

    return this.http.get(`https://localhost:44355/api/Goverment/GetById/${GovernmentId} `);

  }










}

