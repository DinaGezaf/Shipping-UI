import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Goverment } from '../Models/Goverment';

@Injectable({
  providedIn: 'root',
})
export class GovermentService {
  constructor(private http: HttpClient) {}

  GetAllGovernment() {
    return this.http.get('http://localhost:5250/api/Goverments');
  }

  EditGovernment(GovermentId: number, Goverment: Goverment) {
    return this.http.put(
      `https://localhost:44355/api/Goverments/update/${GovermentId}`,
      Goverment
    );
  }

  getGovernmentById(GovernmentId: number) {
    return this.http.get(
      `https://localhost:44355/api/Goverments/GetById/${GovernmentId} `
    );
  }
}
