import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-merchant-table',
  templateUrl: './merchant-table.component.html',
  styleUrls: ['./merchant-table.component.scss']
})
export class MerchantTableComponent implements OnInit {

  public responseData !: Observable<{dimension : string, volume : number} []>
  constructor(private apiService: ApiService) { }


  ngOnInit(): void {
    let body = {
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
      map((value : any)=>{
        return value.data.sort((a : any, b : any) => {
          return b.volume - a.volume
        }).slice(0,20)
      })
    )
  }


}
