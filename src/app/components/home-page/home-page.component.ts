import { HttpParams } from '@angular/common/http';
import {
  Component,
  HostListener,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { INews } from '../../model/inews';
import { ISummary } from '../../model/isummary';
import { YahooFinanceService } from '../../service/yahoo-finance.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private yfSrv: YahooFinanceService) {}
  @ViewChild('stockChart') stockChartElement!: ElementRef;
  symbol: string = '';
  newsList: INews[] = [];
  isLoading: boolean = false;
  isStockChartExpanded: boolean = false;
  summary: ISummary = null;
  chartData: any = null;

  async onSubmit(val: string) {
    if (!val) return;
    this.chartData = null;
    this.isLoading = true;
    console.log('send request with symbol:', val['symbol']);
    this.newsList = await this.yfSrv.getRecentNews(val['symbol']);
    this.summary = await this.yfSrv.getSummary(val['symbol']);
    console.log(this.newsList);
    this.isLoading = false;
    this.isStockChartExpanded = false;
  }

  @HostListener('window:scroll', [])
  async onWindowScroll() {
    if (!this.stockChartElement) return;

    let elementTop =
      this.stockChartElement.nativeElement.getBoundingClientRect().top;

    if (window.innerHeight >= elementTop && !this.isStockChartExpanded) {
      this.isStockChartExpanded = true;
      this.chartData = await this.yfSrv.getChartData(this.symbol);
    }
  }

  ngOnInit() {}
}
