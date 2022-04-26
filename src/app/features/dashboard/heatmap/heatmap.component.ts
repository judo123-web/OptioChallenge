import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {


  private apiSubscription !: Subscription;
  public responseData !: any


  constructor(private apiService: ApiService) { }

  public chartOption !: EChartsOption


  ngOnInit(): void {
    let body = {
      "dimension": "date",
      "types": [
        "spending", "withdrawal"
      ],
      "gteDate": "2018-01-01",
      "lteDate": "2018-01-31",
      "includeMetrics": [
        "volume", "quantity"
      ]
    }

    this.apiSubscription = this.apiService.getAggregateFacts(body).subscribe(data => {
      this.responseData = data.data
      this.initialChartOption("Total cost volume", "Volume")
    })

  }


  initialChartOption(title: string, name: "Volume" | "Quantity") {    

    this.chartOption = {
      title: {
        top: 20,
        left: 'left',
        text: title
      },
      tooltip: {},

      calendar: {
        top: 110,
        left: 30,
        right: 30,
        orient: 'vertical',

        cellSize: 30,
        range: '2018-01',

        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: {
          show: false,
        },
        dayLabel: {
          show: true,
          margin: 10,
          firstDay: 1,
          nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
      },
      visualMap: [
        // can define multiple visualMap components at the same time

        {
          // the second visualMap component
          type: 'piecewise', // defined as discrete visualMap
          // ...
          min : 0,
          max : (name == "Volume") ? 12727624 : 11700,
          orient: 'vertical',
          bottom: 5,
          left: '30'


        },


      ],
      series: {
        name: name,
        type: 'heatmap',
        coordinateSystem: 'calendar',
        label: {
          show: true,
          formatter: function (params: any) {
            let date = new Date(params.data[0])

            return date.getDate().toString();
          },
          color: '#000'
        },
        data:  this.responseData.map((value: any) => {
          return [value.dimension, value[name.toLowerCase()]]
        })

      }
    };


  }

}
