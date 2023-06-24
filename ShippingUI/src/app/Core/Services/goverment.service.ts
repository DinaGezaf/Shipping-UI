import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Goverment } from '../Models/Goverment';

@Injectable({
  providedIn: 'root',
})
export class GovermentService {
  constructor(private http: HttpClient) {}

  GetAllGovernment() {
    return this.http.get('https://localhost:44355/api/Goverments');
  }
  addGovernment(newGovernment: any) {
    return this.http.post(
      'https://localhost:44355/api/Goverments',
      newGovernment,
      {
        responseType: 'text',
      }
    );
  }

  EditGovernment(GovermentId: number, Goverment: Goverment) {
    console.log(Goverment, GovermentId);

    return this.http.put(
      `https://localhost:44355/api/Goverments/${GovermentId}`,
      Goverment
    );
  }

  getGovernmentById(GovernmentId: number) {
    return this.http.get(
      `https://localhost:44355/api/Goverments/${GovernmentId} `
    );
  }
}
