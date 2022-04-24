import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  updateSidebarSize : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  update(isCollapsed : boolean) {
    this.updateSidebarSize.next(isCollapsed)
  }
}
