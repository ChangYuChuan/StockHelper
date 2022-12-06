import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { INews } from '../model/inews';
import { IPrice } from '../model/iprice';
import { IProfits } from '../model/iprofits';
import { ISummary } from '../model/isummary';
@Injectable()
export class YahooFinanceService {
  constructor(private http: HttpClient) {}
  private;

  async getRecentNews(symbol: string, region: string = 'US'): Promise<INews[]> {
    if (!symbol) {
      throw 'lack required input';
    }
    const headers = {
      'X-RapidAPI-Key': '27e44a5394msh82d250d4721146bp1064f5jsnfb355503bb88',
      'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    };
    const url = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete';
    let httpParams = new HttpParams()
      .append('q', symbol)
      .append('region', region);
    let response = await lastValueFrom(
      this.http.get<any>(url, {
        headers: headers,
        params: httpParams,
      })
    );
    console.log('response', response);
    return response['news'];
  }

  async getSummary(symbol: string, region: string = 'US'): Promise<ISummary> {
    const url = 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary';
    const headers = {
      'X-RapidAPI-Key': '27e44a5394msh82d250d4721146bp1064f5jsnfb355503bb88',
      'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
    };

    let httpParams = new HttpParams()
      .append('symbol', symbol)
      .append('region', region);
    let response = await lastValueFrom(
      this.http.get<any>(url, {
        headers: headers,
        params: httpParams,
      })
    );
    console.log('response', response);
    return {
      ...response['summaryProfile'],
      longName: response['price']['longName'],
    };
  }

  async getChartData(symbol: string, region: string = 'US'): Promise<IPrice> {
    const url = 'https://yh-finance.p.rapidapi.com/stock/v2/get-chart';
    const headers = {
      'X-RapidAPI-Key': '27e44a5394msh82d250d4721146bp1064f5jsnfb355503bb88',
      'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
    };
    let httpParams = new HttpParams().appendAll({
      interval: '1d',
      symbol: symbol,
      range: '1mo',
      region: region,
    });
    let response = await lastValueFrom(
      this.http.get<any>(url, {
        headers: headers,
        params: httpParams,
      })
    );
    const datePipe: DatePipe = new DatePipe('en-US');
    let prices = response['chart']['result'][0]['indicators']['quote'][0];
    let dates = response['chart']['result'][0]['timestamp'];
    dates = dates.map((timestamp) =>
      datePipe.transform(new Date(timestamp * 1000), 'MM-dd-YYYY')
    );
    return { ...prices, dates: dates };
  }

  async caculateProfits(
    symbol: string,
    startDate: Date | string,
    endDate: Date | string,
    payPerMonth: number,
    isDividentReinvest: boolean = false
  ): Promise<any> {
    if (!(symbol && startDate && endDate && payPerMonth)) return null;
    let body = {
      data: [
        {
          stockName: symbol,
          payPerMonth: payPerMonth,
          isDividentReinvest: isDividentReinvest,
          endDate: endDate,
          startDate: startDate,
        },
      ],
    };
    let url = 'https://changyuchuan.pythonanywhere.com/api/StocksHistory';
    let response = await lastValueFrom(this.http.post(url, body));
    console.log(response);
    //let response = await lastValueFrom(this.http.post(url, body));
    return response['result'];
  }
}
