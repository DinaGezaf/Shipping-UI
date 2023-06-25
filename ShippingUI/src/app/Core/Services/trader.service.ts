import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Trader } from '../Models/Trader';

@Injectable({
  providedIn: 'root',
})
export class TraderService {
  constructor(private http: HttpClient) {}

  AddTrader(newTrader: Trader) {
    return this.http.post('https://localhost:5250/api/traders', newTrader, {
      responseType: 'text',
    });
  }

  GetAllTraders() {
    return this.http.get('http://localhost:5250/api/traders');
  }

  getTraderById(traderId: number) {
    return this.http.get(`https://localhost:5250/api/traders/${traderId}`);
  }

  DeleteTrader(traderid: number) {
    return this.http.delete(`https://localhost:5250/api/traders/${traderid}`, {
      responseType: 'text',
    });
  }

  updateTrader(id: number, updatedTrader: any) {
    return this.http.put(
      `https://localhost:5250/api/traders/${id}`,
      updatedTrader,
      {
        responseType: 'text',
      }
    );
  }
}
