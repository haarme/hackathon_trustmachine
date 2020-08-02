import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as HighCharts from 'highcharts';
import { DataService } from '../data.service';
import { IUser } from '../models/User';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-financialforecast',
  templateUrl: 'financialforecast.component.html',
  styleUrls: ['financialforecast.component.scss']
})
export class FinancialForecastComponent {

  userInfo: IUser;
  public assetsList: Array<any> = [];
  public liabilitiesList: Array<any> = [];
  public cashflowList: Array<any> = [];

  constructor(
    private router: Router,
    private storage: Storage,
    private menuCntrl: MenuController,
    private alertController: AlertController,
    private dataService: DataService,
    private db: AngularFireDatabase,
  ) {
    this.getBorrwer();

    this.cashflowList.push({
      name: 'JAN 2020',
      amount: 200,
      y: 200
    });
    this.cashflowList.push({
      name: 'FEB 2020',
      amount: 200,
      y: 200
    });
    this.cashflowList.push({
      name: 'MAR 2020',
      amount: 200,
      y: 200
    });
    this.cashflowList.push({
      name: 'APR 2020',
      amount: 200,
      y: 200
    });
    this.cashflowList.push({
      name: 'MAY 2020',
      amount: 200,
      y: 200
    });
    this.cashflowList.push({
      name: 'JUN 2020',
      amount: 200,
      y: 200
    });
    this.assetsList.push({
      name: 'JUL 2020',
      amount: 200,
      y: 200
    });
  }

  navigate(nav: string) {
    this.router.navigateByUrl(nav);
  }


  getBorrwer() {
    if (this.dataService.uid) {
      // this.dataService.loading$.next(true);
      // this.db.list('/vistahacka/userinfo/' + this.uid, ref => ref.limitToLast(25)).valueChanges()
      //   .subscribe(
      //     (data: IUser[]) => {
      //         if (data.length > 0) {
      //             this.userInfo = data[0];
      //         }
      //         this.dataService.loading$.next(false);
      //     },
      //     error => {
      //       this.dataService.loading$.next(false);
      //     }
      //   );

      this.dataService.loading$.next(true);
      const usersList = this.db.list('/vistahacka/userinfo/').valueChanges();
      usersList.subscribe((data: any) => {
        const result = data.filter(x => x.uid === this.dataService.uid);
        if (result && result.length > 0) {
          this.userInfo = result[0];
          this.assetsList.push({
            name: 'Cash and Cash Equivalent',
            amount: parseInt(this.userInfo.balanceSheet.cashAndCashEquivalent),
            y: parseInt(this.userInfo.balanceSheet.cashAndCashEquivalent)
          });
          this.assetsList.push({
            name: 'Accounts Receivable',
            amount: parseInt(this.userInfo.balanceSheet.accountsReceivable),
            y: parseInt(this.userInfo.balanceSheet.accountsReceivable)
          });
          this.assetsList.push({
            name: 'Inventory',
            amount: parseInt(this.userInfo.balanceSheet.inventory),
            y: parseInt(this.userInfo.balanceSheet.inventory)
          });
          this.assetsList.push({
            name: 'Other Assets',
            amount: parseInt(this.userInfo.balanceSheet.otherAssets),
            y: parseInt(this.userInfo.balanceSheet.otherAssets)
          });

          this.liabilitiesList.push({
            name: 'Account Payable',
            amount: parseInt(this.userInfo.balanceSheet.accountPayable),
            y: parseInt(this.userInfo.balanceSheet.accountPayable)
          });
          this.liabilitiesList.push({
            name: 'Long Term Debt/Loan',
            amount: parseInt(this.userInfo.balanceSheet.longTermDebtLoan),
            y: parseInt(this.userInfo.balanceSheet.longTermDebtLoan)
          });
          this.liabilitiesList.push({
            name: 'Other Liabilities',
            amount: parseInt(this.userInfo.balanceSheet.otherLiabilities),
            y: parseInt(this.userInfo.balanceSheet.otherLiabilities)
          });

          this.plotAssetsChart();
          this.plotLiabilitiesChart();
          this.plotSimplePieChart();
        }
        else {
          this.dataService.presentErrorToast('Failed to load data.');
        }
        this.dataService.loading$.next(false);
      },
        error => {
          this.dataService.loading$.next(false);
        });
    }
  }

  plotSimplePieChart() {
    const myChart = HighCharts.chart('divPie', {
      chart: {
        plotBackgroundColor: '#ffffff',
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        type: undefined,
        data: this.assetsList
      }]
    });
  }

  plotAssetsChart() {
    const myChart = HighCharts.chart('divAssets', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'bar'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Cash and Cash Equivalent', 'Accounts Receivable', 'Inventory', 'Other Assets']
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: [{
        name: 'Assets',
        colorByPoint: true,
        type: undefined,
        data: this.assetsList
      }]
    });
  }

  plotLiabilitiesChart() {
    const myChart = HighCharts.chart('divLiabilities', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'bar'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Account Payable', 'Long Term Debt/Loan', 'Other Assets']
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: [{
        name: 'Liabilities',
        colorByPoint: true,
        type: undefined,
        data: this.liabilitiesList
      }]
    });
  }

}
