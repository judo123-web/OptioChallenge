import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TableComponent } from './features/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { DonutComponent } from './features/dashboard/donut/donut.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { HeatmapComponent } from './features/dashboard/heatmap/heatmap.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { LineComponent } from './features/dashboard/line/line.component';
import { MerchantTableComponent } from './features/dashboard/merchant-table/merchant-table.component';
import { FirstLetterUperCasePipe } from './shared/pipes/first-letter-uper-case.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';








@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableComponent,
    DonutComponent,
    HeatmapComponent,
    LineComponent,
    MerchantTableComponent,
    FirstLetterUperCasePipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,


    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
