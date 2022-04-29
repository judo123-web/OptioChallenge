import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AggregateFact } from '../shared/interfaces/aggregate-fact';
import { AggregateFactResult } from '../shared/interfaces/aggregate-fact-result';
import { FindFact } from '../shared/interfaces/find-fact';
import { FindFactResult } from '../shared/interfaces/find-fact-result';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAggregateFacts(body: AggregateFact): Observable<AggregateFactResult> {
    return this.http.post<AggregateFactResult>("https://api.next.insight.optio.ai/api/v2/analytics/transactions/facts/aggregate", body)
  }

  findFacts(body: FindFact): Observable<FindFactResult> {
    return this.http.post<FindFactResult>("https://api.next.insight.optio.ai/api/v2/analytics/transactions/facts/find", body)
  }

}
