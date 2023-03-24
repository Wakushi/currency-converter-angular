import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs"; 
import { ExchangeResult } from "src/app/interfaces/currency.interface";

@Injectable({
    providedIn:"root"
})

export class ExchangeRateService {

    constructor(private http:HttpClient){}

    getCurrencyConversion(form:object, reversed:boolean): Observable<ExchangeResult> {
      const order = reversed ? [1,0] : [0,1]
      const currencyA = Object.values(form)[order[0]]
      const currencyB = Object.values(form)[order[1]]
      const value = Object.values(form)[2]

      const headers = new HttpHeaders({
        'apikey': 'YOUR_API_KEY'
      });

      const url = `https://api.apilayer.com/exchangerates_data/convert?to=${currencyB}&from=${currencyA}&amount=${value}`;
      return this.http.get<ExchangeResult>(url, { headers: headers }).pipe(
        map(data => ({
          query: { 
            from:data.query.from,
            to:data.query.to,
            amount:data.query.amount
         },
          result: data.result
        }))
      )
    }

}
