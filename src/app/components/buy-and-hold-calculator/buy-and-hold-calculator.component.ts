import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IProfits } from '../../model/iprofits';
import { YahooFinanceService } from '../../service/yahoo-finance.service';
@Component({
  selector: 'app-buy-and-hold-calculator',
  templateUrl: './buy-and-hold-calculator.component.html',
  styleUrls: ['./buy-and-hold-calculator.component.css'],
})
export class BuyAndHoldCalculatorComponent implements OnInit {
  constructor(private yfSrv: YahooFinanceService, private datePipe: DatePipe) {}

  @Input()
  symbol: string = null;
  startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 2));
  startDateString = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
  endDate: Date = new Date();
  endDateString = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
  isDividentReinvest: boolean = false;
  payPerMonth: number = 1000;
  rowData: IProfits[] = [];

  columnDefs: any = [{ field: 'stockName' }];
  async ngOnInit() {
    this.getProfitResult();
  }
  onSubmit(val: any) {
    this.getProfitResult();
  }

  async getProfitResult() {
    this.rowData = await this.yfSrv.caculateProfits(
      this.symbol,
      this.startDateString,
      this.endDateString,
      this.payPerMonth,
      this.isDividentReinvest
    );

    for (let key of Object.keys(this.rowData[0])) {
      if (key == 'stockName') continue;
      this.columnDefs.push({ field: key });
    }
    this.columnDefs = [...this.columnDefs];
    this.rowData = this.rowData;
    console.log(this.rowData);
  }
}
