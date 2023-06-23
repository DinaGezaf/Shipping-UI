import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../Models/City';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}

  AddCity(City: {}) {
    return this.http.post('https://localhost:44355/api/Cities', City);
  }

  getCityById(CityId: number) {
    return this.http.get(`https://localhost:44355/api/Cities/${CityId} `);
  }

  EditCity(CityId: number, City: City) {
    return this.http.put(
      `https://localhost:44355/api/Cities?id=${CityId}`,
      City
    );
  }

  getCitiesByGovernment(governmentName: string) {
    return this.http.get(
      `http://localhost:5250/api/Cities/government/${governmentName}`
    );
  }
}
