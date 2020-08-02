import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { IUser } from '../models/User';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
    selector: 'app-borrowerbusinessinfo',
    templateUrl: 'borrowerbusinessinfo.component.html',
    styleUrls: ['borrowerbusinessinfo.component.scss']
})
export class BorrowerBusinessInfoComponent {

    public isBusinessNew: boolean;
    public business: string;
    public businessList: any[] = ['Construction', 'Agriculture',
        'Education', 'Retail', 'Tourism', 'Manufacturing', 'Wholesale/distribution'];
    public year: string;
    public yearList: any[] = [
        {yearName: '0', yearRange: '0 - 1 years'},
        {yearName: '1', yearRange: '1 - 3 years'},
        {yearName: '2', yearRange: '3 - 5 years'},
        {yearName: '3', yearRange: '5 - 10 years'},
        {yearName: '4', yearRange: '10 - 20 years'},
        {yearName: '5', yearRange: '20+'},
    ];

    public employees: string;
    public employeesList: any[] = [
        {employeeListName: '0', employeeRange: '1 - 10 Employees'},
        {employeeListName: '1', employeeRange: '10 - 20 Employees'},
        {employeeListName: '2', employeeRange: '20 - 50 Employees'},
        {employeeListName: '3', employeeRange: '50 - 100 Employees'},
        {employeeListName: '4', employeeRange: '100 - 500 Employees'},
        {employeeListName: '5', employeeRange: '500+'},
    ];

    constructor(
        public router: Router,
        public dataService: DataService,
        private storage: Storage,
        private db: AngularFireDatabase
    ) {
        this.isBusinessNew = true;
        this.business = this.businessList[1];
        this.year = '2';
        this.employees = '0';
    }

    ionViewDidEnter() { }

    save() {
        this.storage.get('uid').then(result => {
            if (result) {
                const rootRef = firebase.database().ref();
                const documentRef = rootRef.child('vistahacka/userinfo/' + result);
                const document = {
                businessinfo: {
                    isBusinessNew: this.isBusinessNew,
                    business: this.business,
                    year: this.year,
                    employees: this.employees,
                }
                };
                documentRef.update(document);
                this.router.navigateByUrl('user/loandetailspages');
            }
        });
    }
}
