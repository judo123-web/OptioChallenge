import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from '../features/table/table.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';

const routes : Routes = [
  {
    path : "",
    component : MainComponent,
    children : [
      { path : "dashboard", component : DashboardComponent},
      { path : "table", component : TableComponent },
      { path : "", redirectTo : "dashboard", pathMatch : "full"},

    ]
  }
]

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
