import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-loanapplication',
  templateUrl: './loanapplication.component.html',
  styleUrls: ['./loanapplication.component.scss']
})
export class LoanapplicationComponent implements OnInit {

  purposeOfLoan: string;
  loanAmount: string;
  termOfLoan: string;


  public purposeOfLoanTypes: any[] = ['Purchase Money', 'Construction - Permanent',
    'Interim Construction', 'Cash-Out Refinance', 'No Cash-Out Refinance'];

  constructor(
    public router: Router,
    private storage: Storage,
    public dataService: DataService,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    this.purposeOfLoan = 'Purchase Money';
    this.loanAmount = '20000';
    this.termOfLoan = '3 to 5 Yrs';
  }

  save() {
    this.submitLoan();
    this.storage.get('uid').then(result => {
      if (result) {
        const rootRef = firebase.database().ref();
        const documentRef = rootRef.child('vistahacka/userinfo/' + result);
        const document = {
          loanApplication: {
            purposeOfLoan: this.purposeOfLoan,
            loanAmount: this.loanAmount,
            termOfLoan: this.termOfLoan,
            status: 'pending',
          }
        };
        documentRef.update(document);
      }
    });
  }



  async submitLoan() {
    this.dataService.loading$.next(true);
    await this.delay(2000);
    this.dataService.loading$.next(false);
    this.dataService.isLoanDetailsCompleted = true;
    this.dataService.presentSuccessToast('Loan Application Submitted');
    this.router.navigateByUrl('userwelcome');
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
