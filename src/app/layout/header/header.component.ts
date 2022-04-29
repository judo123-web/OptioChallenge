import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private isCollapsed !: boolean
  public title !: string

  constructor(private layoutService: LayoutService, private router: Router) { }

  ngOnInit(): void {
    this.isCollapsed = false


    this.title = 'dashboard';
    let splitedUrl = window.location.href.split('/')
    this.title = splitedUrl[splitedUrl.length - 1]

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(event => {
        this.title = event.url.split('/')[1];
      });
    
    this.onWindowResize()
  }

  changeSidebarSize() {
    this.isCollapsed = !this.isCollapsed
    this.layoutService.update(this.isCollapsed)
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 1000) {
      this.isCollapsed = true
      this.layoutService.update(this.isCollapsed)
    } else {
      if (window.innerWidth) {
        this.isCollapsed = false
        this.layoutService.update(this.isCollapsed)
      }
    }

  }

}
