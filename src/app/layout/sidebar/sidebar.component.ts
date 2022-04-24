import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public isCollapsed !: boolean

  constructor(private layoutService : LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateSidebarSize.subscribe((isCollapsed : boolean) =>{
      this.isCollapsed = isCollapsed
    })
  }

  Navigate_to_Optio() {
    const url = 'https://www.optio.ai/';
    window.open(url, '_blank');
  }

}
