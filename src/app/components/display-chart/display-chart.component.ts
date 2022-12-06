import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { IPrice } from '../../model/iprice';
@Component({
  selector: 'app-display-chart',
  templateUrl: './display-chart.component.html',
  styleUrls: ['./display-chart.component.css'],
})
export class DisplayChartComponent implements OnInit, OnChanges {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions = {
    title:{
      text:""
    },
    series: [],
    yAxis: [
      {
        title: { text: 'Price' },
        height: '80%',
      },
      {
        title: { text: 'Volume' },
        opposite: true,
        top: '80%',
        height: '20%',
      },
    ],
  };

  updateFlag = false;
  @Input()
  symbol:string = null;
  @Input()
  pricesData: IPrice = null;
  constructor() {}

  ngOnInit() {
    this.displayChart();
  }

  ngOnChanges() {}

  displayChart() {
    if (!this.pricesData) return;
    console.log(this.pricesData);
    let ohlc: any[] = [];
    let volume: any[] = [];
    for (let i = 0; i < this.pricesData.dates.length; i++) {
      ohlc.push([
        this.pricesData.dates[i],
        this.pricesData.open[i],
        this.pricesData.high[i],
        this.pricesData.low[i],
        this.pricesData.close[i],
      ]);
      volume.push([this.pricesData.dates[i], this.pricesData.volume[i]]);
    }
    this.chartOptions.series = [
      { type: 'candlestick', data: ohlc, name: 'stock price' },
      {
        type: 'column',
        data: volume,
        name: 'volume',
        yAxis: 1,
      },
    ];
    this.chartOptions.title.text = this.symbol
  }
}
