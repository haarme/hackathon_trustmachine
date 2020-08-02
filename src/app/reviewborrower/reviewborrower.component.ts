import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IUser } from '../models/User';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataService } from '../data.service';
import * as firebase from 'firebase';
import { Guid } from '../guid';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-reviewborrower',
  templateUrl: 'reviewborrower.component.html',
  styleUrls: ['reviewborrower.component.scss']
})
export class ReviewBorrowerComponent {

  abcd: string;
  uid: string;
  userInfo: IUser;
  public assetsList: Array<any> = [];
  public liabilitiesList: Array<any> = [];

  public suggestedProductList: Array<any> = [];
  public borrowerProduct: Array<any> = [];


  public yearList: any[] = ['0 - 1 years', '1 - 3 years', '3 - 5 years', '5 - 10 years', '10 - 20 years', '20+'];
  public employeesList: any[] = ['1 - 10 employees', '10 - 20 employees', '20 - 50 employees', '50 - 100 employees', '100 - 500 employees', '500+ employees'];

  constructor(
    public router: Router,
    private storage: Storage,
    private menuCntrl: MenuController,
    private alertController: AlertController,
    public dataService: DataService,
    private db: AngularFireDatabase,
    private actRoute: ActivatedRoute
  ) {
    this.abcd = this.actRoute.snapshot.queryParams.id;
    this.uid = this.actRoute.snapshot.queryParams.uid;
    this.getBorrwer();
  }

  ionViewDidEnter() {
    this.abcd = this.actRoute.snapshot.queryParams.id;
    this.uid = this.actRoute.snapshot.queryParams.uid;
    this.getBorrwer();
  }

  async sendToBank() {
    this.dataService.loading$.next(true);
    await this.delay(2000);
    this.dataService.loading$.next(false);
    this.dataService.presentSuccessToast('Send to the Bank for eligible Products');
    await this.delay(3000);
    this.dataService.presentSuccessToast('Suggest a product');
    this.router.navigateByUrl('user/suggestproductsforborrower');
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getBorrwer() {
    if (this.uid) {

      this.dataService.loading$.next(true);
      const usersList = this.db.list('/vistahacka/userinfo/').valueChanges();
      usersList.subscribe((data: any) => {
        const result = data.filter(x => x.uid === this.uid);
        if (result && result.length > 0) {
          this.liabilitiesList = [];
          this.assetsList = [];
          this.userInfo = result[0];
          this.dataService.coachTempEditBorrowerEmail = result[0].email;

          if (this.userInfo?.balanceSheet !== undefined) {
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
            this.plotSimplePieChart('divAssets', this.assetsList);
            this.plotSimplePieChart('divLiabilities', this.liabilitiesList);
            this.getProducts();
          }

        }
        else {
          this.dataService.presentErrorToast('Failed to Login.');
        }
        this.dataService.loading$.next(false);
      },
        error => {
          this.dataService.loading$.next(false);
        });
    }
  }


  getProducts() {
    this.dataService.loading$.next(true);
    this.db.list('/vistahacka/suggestedproducts/', ref => ref.limitToLast(25)).valueChanges()
      .subscribe(
        (data: any) => {
          this.suggestedProductList = [];
          this.borrowerProduct = [];
          const filtererList = data.filter(x => x.borrowerEmail === this.userInfo.email)[0];

          for (const iterator1 of filtererList.productList) {
            this.suggestedProductList.push(...this.dataService.productList.filter(x => x.id === iterator1));
          }

          this.borrowerProduct.push(...this.dataService.productList.filter(x => x.id === this.userInfo.product));

          this.dataService.loading$.next(false);
        },
        error => {
          this.dataService.loading$.next(false);
        }
      );
  }

  accept() {
    const rootRef = firebase.database().ref();
    const documentRef = rootRef.child('vistahacka/coachmapping/' + this.abcd);
    const coachs = {
      status: 'accepted'
    };
    documentRef.update(coachs);

    const userRef = rootRef.child('vistahacka/userinfo/' + this.uid);
    const mycoach = {
      mycoach: this.dataService.email
    };
    userRef.update(mycoach);
    this.router.navigateByUrl('user/coachdashboard');
  }

  reject() {
    const rootRef = firebase.database().ref();
    const documentRef = rootRef.child('vistahacka/coachmapping/' + this.abcd);
    const coachs = {
      status: 'rejected'
    };
    documentRef.update(coachs);
  }

  done() {
    this.router.navigateByUrl('user/coachdashboard');
  }

  plotSimplePieChart(ctrlName: string, list: any) {
    const myChart = HighCharts.chart(ctrlName, {
      chart: {
        plotBackgroundColor: null,
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
        data: list
      }]
    });
  }
}
