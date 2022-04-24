import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getAggregateFacts (body : any) : Observable<any> {
    return this.http.post("https://api.next.insight.optio.ai/api/v2/analytics/transactions/facts/aggregate",{
      body : body
    })
  }

  findFacts (body : any) : Observable<any> {
    return this.http.post("https://api.next.insight.optio.ai/api/v2/analytics/transactions/facts/find",{
      body : body
    })
  }

}
