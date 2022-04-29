import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AggregateFact } from 'src/app/shared/interfaces/aggregate-fact';
import { AggregateFactResult } from 'src/app/shared/interfaces/aggregate-fact-result';
import { FactDto } from 'src/app/shared/interfaces/fact-dto';

@Component({
  selector: 'app-merchant-table',
  templateUrl: './merchant-table.component.html',
  styleUrls: ['./merchant-table.component.scss']
})
export class MerchantTableComponent implements OnInit {

  public responseData !: Observable<FactDto []>
  constructor(private apiService: ApiService) { }


  ngOnInit(): void {
    let body : AggregateFact= {
      "dimension": "merchant",
      "types": [
        "none"
      ],
      "gteDate": "2018-01-01",
      "lteDate": "2018-01-31",
      "includeMetrics": [
        "volume"
      ]
    }
    this.responseData = this.apiService.getAggregateFacts(body)
    .pipe(
      map((value : AggregateFactResult)=>{
        return value.data.sort((a : FactDto, b :FactDto) => {
          return b?.volume - a?.volume
        }).slice(0,20)
      })
    )
  }


}
