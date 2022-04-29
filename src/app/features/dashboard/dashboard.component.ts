import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  show :boolean = false

  ngOnInit(): void {
    setInterval(()=>{
      this.show = !this.show
    },5000)
  }

}
