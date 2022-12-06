import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { YahooFinanceService } from './service/yahoo-finance.service';
import { CommonModule } from '@angular/common';
import { DisplayChartComponent } from './components/display-chart/display-chart.component';
import { BuyAndHoldCalculatorComponent } from './components/buy-and-hold-calculator/buy-and-hold-calculator.component';
import { DatePipe } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AgGridModule } from 'ag-grid-angular';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    HighchartsChartModule,
    AgGridModule,
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    DisplayChartComponent,
    BuyAndHoldCalculatorComponent,
  ],
  providers: [YahooFinanceService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
