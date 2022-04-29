import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { map, mergeMap, Observable, of, Subscription, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { FindFact } from 'src/app/shared/interfaces/find-fact';
import { FindFactResult } from 'src/app/shared/interfaces/find-fact-result';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit, OnDestroy {
  public deminitions: Array<string> = ['Salary', 'Income From Deposits', 'Bonus', 'Other Income', 'Dividend', 'Retirement']
  public chartOption !: EChartsOption
  private apiSubscription !: Subscription
  public show: boolean = true

  constructor(private apiService: ApiService) { }
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe()
    this.chartOption = {}
    this.show = false
  }

  ngOnInit() {

    let body : FindFact = {
      "dimension": "category",
      "types": [
        "income"
      ],
      "gteDate": "2018-01-01",
      "lteDate": "2018-01-31",
      "sortBy": "date",
      "sortDirection": "asc",
      "pageIndex": 0,
      "pageSize": 50,
      "includes": ["dimension", "date", "volume"]
    }
    this.apiSubscription = this.getAllMergedData(this.apiService.findFacts(body), body)
      .pipe(
        map((value: any[]) => {
          let deminsion: string
          let date: Date
          let sortedObj: { [value: string]: Array<any> } = {
            'Bonus': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'Dividend': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'Income From Deposits': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'Other Income': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'Retirement': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'Salary': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }

          for (let i = 0; i < value.length; i++) {

            deminsion = value[i]['dimension']
            date = new Date(value[i].date)
            sortedObj[deminsion][Number(date.getDate() - 1)] = value[i].volume

          }

          return sortedObj
        })
      ).subscribe((data: any) => {
        this.initialChartOption("Total volume of income", data)

      })




  }

  getAllMergedData(par: Observable<FindFactResult>, body: any): Observable<Array<FindFact>> {
    return par.pipe(
      mergeMap((value: any, i: number) => {
        if (value.data.entities.length > 0) {
          body.pageIndex += 1
          let apiObservable = this.apiService.findFacts(body)
          return this.getAllMergedData(apiObservable, body).pipe(map((childvalue: FindFact []) => {
            return [...value.data.entities, ...childvalue]
          }))
        } else {
          return of([])
        }
      })
    )
  }


  initialChartOption(title: string, data: any) {
    this.chartOption = {
      title: {
        left: 'center',
        text: title

      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        top: 25,
        data: ['Salary', 'Income From Deposits', 'Bonus', 'Other Income', 'Dividend', 'Retirement']
      },
      toolbox: {

      },
      grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Salary',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          smooth: true,
          lineStyle: {
            width: 3
          },
          emphasis: {
            focus: 'series'
          },
          data: data.Salary
        },

        {
          name: 'Income From Deposits',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          smooth: true,
          lineStyle: {
            width: 3
          },
          emphasis: {
            focus: 'series'
          },
          data: data['Income From Deposits']
        },

        {
          name: 'Bonus',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          smooth: true,
          lineStyle: {
            width: 3
          },
          emphasis: {
            focus: 'series'
          },
          data: data.Bonus
        },

        {
          name: 'Other Income',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          smooth: true,
          lineStyle: {
            width: 3
          },
          emphasis: {
            focus: 'series'
          },
          data: data['Other Income']
        },


        {
          name: 'Dividend',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          smooth: true,
          lineStyle: {
            width: 3
          },
          emphasis: {
            focus: 'series'
          },
          data: data.Dividend
        },

        {
          name: 'Retirement',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          smooth: true,
          lineStyle: {
            width: 3
          },
          emphasis: {
            focus: 'series'
          },
          data: data.Retirement
        },


      ]
    };
  }

}
