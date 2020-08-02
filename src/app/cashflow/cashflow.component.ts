import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.css']
})
export class CashflowComponent implements OnInit {

  cashReceived: string;
  cashOnGoodsAndService: string;
  employeeCostPaid: string;
  otherAssets: string;
  assetPurchaseAndSale: string;
  investments: string;
  interestReceived: string;
  debtDrawDown: string;
  capitalRepayment: string;
  equityRelease: string;
  dividendPayments: string;

  constructor(public router: Router) {
    this.cashReceived = '300';
    this.cashOnGoodsAndService = '400';
    this.employeeCostPaid = '600';
    this.otherAssets = '1000';
    this.assetPurchaseAndSale = '800';
    this.investments = '4000';
    this.interestReceived = '600';
    this.debtDrawDown = '400';
    this.capitalRepayment = '600';
    this.equityRelease = '800';
    this.dividendPayments = '700';
  }

  ngOnInit() {
  }

  save() {
    this.router.navigateByUrl('user/loandetailspages');
  }
}
