import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Trader } from '../models/Trader';

@Injectable({
  providedIn: 'root'
})
export class TraderService {


  AddTrader(newTrader: Trader) {
     this.http.post('https://newshipping1-6861f-default-rtdb.firebaseio.com/trader.json',newTrader)
              .subscribe(Responsedata=>{
                console.log(Responsedata);
              })
  }


  constructor(private http : HttpClient) { }


  GetAllTraders() {
    return  this.http.get('https://newshipping1-6861f-default-rtdb.firebaseio.com/trader.json')

.pipe(map((responsedata : any)=>{
const traderesArray =[];
for(const key in responsedata){
traderesArray.push({...responsedata[key]  , id: key})
}
return traderesArray
}))
  }


}
