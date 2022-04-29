import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DonutComponent } from './donut/donut.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { LineComponent } from './line/line.component';
import { MerchantTableComponent } from './merchant-table/merchant-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxEchartsModule } from 'ngx-echarts';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


const routes : Routes = [
  {
    path : "",
    component : DashboardComponent
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    DonutComponent,
    HeatmapComponent,
    LineComponent,
    MerchantTableComponent,
  ],
  imports: [
    CommonModule,

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

    RouterModule.forChild(routes),
    SharedModule
  ],

})
export class DashboardModule { }
