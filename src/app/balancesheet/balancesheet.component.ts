import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { IUser } from '../models/User';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-balancesheet',
    templateUrl: 'balancesheet.component.html',
    styleUrls: ['balancesheet.component.scss']
})
export class BalanceSheetComponent {

    public cashAndCashEquivalent: number;
    public accountsReceivable: number;
    public inventory: number;
    public otherAssets: number;
    public accountPayable: number;
    public longTermDebtLoan: number;
    public otherLiabilities: number;

    constructor(
        public router: Router,
        public dataService: DataService,
        private storage: Storage,
        private db: AngularFireDatabase
    ) { }

    ionViewDidEnter() {
        this.cashAndCashEquivalent = 1200;
        this.accountsReceivable = 500;
        this.inventory = 800;
        this.otherAssets = 1000;
        this.accountPayable = 1200;
        this.longTermDebtLoan = 500;
        this.otherLiabilities = 200;
     }

    save() {
        this.storage.get('uid').then(result => {
            if (result) {
                const rootRef = firebase.database().ref();
                const documentRef = rootRef.child('vistahacka/userinfo/' + result);
                const document = {
                  balanceSheet: {
                    cashAndCashEquivalent: this.cashAndCashEquivalent,
                    accountsReceivable: this.accountsReceivable,
                    inventory: this.inventory,
                    otherAssets: this.otherAssets,
                    accountPayable: this.accountPayable,
                    longTermDebtLoan: this.longTermDebtLoan,
                    otherLiabilities: this.otherLiabilities,
                  }
                };
                documentRef.update(document);
                this.router.navigateByUrl('user/loandetailspages');
            }
        });
    }
}
