import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Table } from 'src/app/shared/interfaces/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  public startDate = new Date(2018, 1, 1);
  public endDate = new Date(2020, 3, 31)

  public sortOptions !: { active: string, direction: "asc" | "desc" }
  public paginatorOptions !: { previousPageIndex?: number, pageIndex: number, pageSize: number, length: number }

  public range !: FormGroup

  public dataSource: Table[] = []
  public displayedColumns: string[] = ['dimension', 'date', 'quantity', 'volume', 'average', 'differenceQuantity', 'differenceVolume'];

  private formValueChangeSubs !: Subscription
  private apiSubscription !: Subscription

  constructor(private apiService: ApiService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.dataSource = []

    this.range = this.fb.group({
      start: [""],
      end: [""],
    })

    if (localStorage.getItem("date_range")) {
      let date_range = JSON.parse(localStorage.getItem("date_range") as string)
      this.range.patchValue({
        start: date_range.start,
        end: date_range.end,
      })
    }

    this.formValueChangeSubs = this.range.valueChanges.subscribe((date_range: any) => {
      localStorage.setItem("date_range", JSON.stringify(date_range))
      localStorage.removeItem("paginatorOptions")
      this.setTableData()
    })

    let body = {
      "dimension": "category",
      "types": ["none", "income", "spending", "withdrawal", "foreign-exchange", "transfer-own-accounts"],
      "includes": ["dimension", "date", "quantity", "volume",
        "average", "differenceQuantity", "differenceVolume",
      ]
    }
    localStorage.setItem('body', JSON.stringify(body))

    this.setTableData()

  }

  announceSortChange(sortOptions: { active: string, direction: string }) {
    localStorage.setItem("sortOptions", JSON.stringify(sortOptions))
    this.setTableData()
  }


  setPageSizeOptions(setPageSizeOptionsInput: any) {
    localStorage.setItem("paginatorOptions", JSON.stringify(setPageSizeOptionsInput))
    this.setTableData()
  }



  setTableData() {
    let body: any = JSON.parse(localStorage.getItem('body') as string)
    this.sortOptions = JSON.parse(localStorage.getItem("sortOptions") as string)
    this.paginatorOptions = JSON.parse(localStorage.getItem("paginatorOptions") as string)

    if (localStorage.getItem("sortOptions")) {
      if (this.sortOptions.active.length > 0 && this.sortOptions.direction.length > 0) {
        body.sortBy = this.sortOptions.active
        body.sortDirection = this.sortOptions.direction
      }

    } else {
      this.sortOptions = { active: "", direction: "asc" }
      localStorage.setItem("sortOptions", JSON.stringify(this.sortOptions))
    }

    if (this.paginatorOptions) {
      body["pageIndex"] = this.paginatorOptions.pageIndex
      body["pageSize"] = this.paginatorOptions.pageSize
    } else {
      this.paginatorOptions = { pageIndex: 0, pageSize: 10, length: 0 }
    }

    let date_range = this.range.value

    if (date_range.start) {
      body.gteDate = date_range.start
    }

    if (date_range.end) {
      body.lteDate = date_range.end
    }


    this.apiSubscription = this.apiService.findFacts(body)
      .subscribe(response => {
        this.paginatorOptions.length = response.data.total
        this.dataSource = response.data.entities
      })
  }


  ngOnDestroy(): void {
    this.formValueChangeSubs.unsubscribe()
    this.apiSubscription.unsubscribe()

    localStorage.clear()

  }

}
