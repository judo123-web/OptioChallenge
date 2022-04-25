import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService) { }
  public chartOption !: EChartsOption

  private apiSubscription !: Subscription


  ngOnInit(): void {
    let body = {
      "dimension": "parent-category",
      "types": [
        "spending", "withdrawal"
      ],
      "gteDate": "2018-01-01",
      "lteDate": "2018-01-31",
      "includeMetrics": [
        "volume"
      ]
    }

    this.apiSubscription = this.apiService.getAggregateFacts(body)
      .subscribe(data => {
        this.initialChartOption(data)
      })
  }

  initialChartOption(data: any) {

    this.chartOption = {
      title: {
        text: 'Cost categories and distribution',
        left: 'left'
      },

      tooltip: {
        trigger: 'item'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 0,
        top: 20,
        bottom: 20,
      },
      series: [
        {
          type: 'pie',
          selectedMode: 'single',
          selectedOffset: 10,
          radius: ['15%', '70%'],
          center: ['33%', '50%'],
          label: {
            show: false,
            position: 'center'
          },
          itemStyle: {
            borderRadius: 7
          },

          labelLine: {
            show: false
          },
          data: data.data.map((element: any) => {
            return { value: element.volume.toFixed(2), name: element.dimension }
          })
        }
      ]
    };
  }


  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe()
  }

}
