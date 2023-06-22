import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Trader } from '../models/Trader';

@Injectable({
  providedIn: 'root',
})
export class TraderService {
  constructor(private http: HttpClient) {}

  AddTrader(newTrader: Trader) {
    return this.http.post('http://localhost:5250/api/traders', newTrader, {
      responseType: 'text',
    });
  }

  GetAllTraders() {
    return this.http.get('http://localhost:5250/api/traders');
  }

  getTraderById(traderId: number) {
    return this.http.get(`http://localhost:5250/api/traders/${traderId}`);
  }

  DeleteTrader(traderid: number) {
    return this.http.delete(`http://localhost:5250/api/traders/${traderid}`, {
      responseType: 'text',
    });
  }

  updateTrader(id: number, updatedTrader: any) {
    return this.http.put(
      `http://localhost:5250/api/traders/${id}`,
      updatedTrader,
      {
        responseType: 'text',
      }
    );
  }
}
