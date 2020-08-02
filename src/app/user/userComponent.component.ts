import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataService } from '../data.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-user',
  templateUrl: 'userComponent.component.html',
  styleUrls: ['userComponent.component.scss']
})

export class UserComponent {

    public coachResponseList: Array<any> = [];
    public coachResponseListShow: boolean;
    public coachMappingList: Array<any> = [];

    public notificationMessage: string;
    public uid: string;
    public id: string;

    public coachProductSuggestedResponseList: Array<any> = [];
    public coachProductSuggestedResponseListShow: boolean;
    public coachProductSuggestedList: Array<any> = [];
    private rootRef = firebase.database().ref();
    private documentRef = this.rootRef.child('vistahacka/coachmapping');

    constructor(
        public dataService: DataService,
        private router: Router,
        private menuCntrl: MenuController,
        private storage: Storage,
        private db: AngularFireDatabase
    ) {
        this.coachProductSuggestedResponseList = [];
        this.coachMappingList = [];
        this.getCoachMappingList();
        this.getCoachResponseList();

        this.getCoachProductSugggestedList();
        this.getCoachProductSugggestedResponseList();
        this.getCoachLoanApplicationStatus();
        this.coachResponseListShow = false;
        this.coachProductSuggestedResponseListShow = false;
    }

    getCoachResponseList() {
        this.db.list('/vistahacka/coachmapping').valueChanges()
        .subscribe((data: any) => {
            this.coachResponseList = [];
            const result = data.filter(x => x.borrowerEmail === this.dataService.email && x.status !== 'requested');
            result.forEach(element => {
                this.coachResponseList.push(element);
            });
            if (this.coachResponseList.length > 0 && this.coachResponseList[0].status === 'accepted') {
                this.dataService.coachEmail = this.coachResponseList[0].coachEmail;
            }
            this.coachResponseListShow = true;
        });
    }

    getCoachMappingList() {
        this.db.list('/vistahacka/coachmapping').valueChanges()
        .subscribe((data: any) => {
            this.coachMappingList = [];
            const result = data.filter(x => x.coachEmail === this.dataService.email && x.status === 'requested');
            result.forEach(element => {
                this.coachMappingList.push(element);
            });
        });
    }


    getCoachProductSugggestedResponseList() {
        this.db.list('/vistahacka/suggestedproducts').valueChanges()
        .subscribe((data: any) => {
            this.coachProductSuggestedResponseList = [];
            const result = data.filter(x => x.coachEmail === this.dataService.email && x.status === 'updated');
            result.forEach(element => {
                this.coachProductSuggestedResponseList.push(element);
            });
            this.coachProductSuggestedResponseListShow = true;
        });
    }

    getCoachLoanApplicationStatus() {
        this.db.list('/vistahacka/userinfo').valueChanges()
        .subscribe((data: any) => {
            this.coachProductSuggestedResponseList = [];
            this.notificationMessage = '';
            let result = data.filter(x => x.mycoach === this.dataService.email
                &&  x.email === this.dataService.coachSelectedBorrowerEmail && x.loanApplication.status === 'pending');
            if (result.length > 0) {
                this.notificationMessage = 'You have a loan application to review from ' + result[0].name;
            } else {
                result = data.filter(x => x.mycoach === this.dataService.email
                    &&  x.email === this.dataService.coachSelectedBorrowerEmail && x.loanApplication.status === 'updated');
                this.notificationMessage = result[0].name + ' has selected a product';
            }
            this.id = result[0].id;
            this.uid = result[0].uid;
        });
    }

    getCoachProductSugggestedList() {
        this.db.list('/vistahacka/suggestedproducts').valueChanges()
        .subscribe((data: any) => {
            this.coachProductSuggestedList = [];
            const result = data.filter(x => x.borrowerEmail === this.dataService.email && x.status === 'suggested');
            result.forEach(element => {
                this.dataService.isSuggestedProductCompleted = true;
                this.dataService.showNotification = true;
                this.coachProductSuggestedList.push(element);
            });
            this.dataService.showNotification = true;
        });
    }

    public navigateFromSideMenu(url): void {
        this.router.navigateByUrl(url);
        this.menuCntrl.close();
    }

    public navigateToReview() {
        this.notificationMessage = null;
        this.router.navigateByUrl('user/reviewborrower?uid=' + this.uid);
    }

    public logout(): void {
        this.storage.clear();
    }

    accept(val: any) {
        const rootRef = firebase.database().ref();
        const documentRef = rootRef.child('vistahacka/coachmapping/' + val.id);
        const coachs = {
            status: 'accepted'
        };
        documentRef.update(coachs);

        const userRef = rootRef.child('vistahacka/userinfo/' + val.uid);
        const mycoach = {
            mycoach: val.coachEmail
        };
        userRef.update(mycoach);
        this.dataService.coachSelectedBorrowerEmail = val.borrowerEmail;
        this.coachResponseListShow = true;
    }

    reject(val: any) {
        const rootRef = firebase.database().ref();
        const documentRef = rootRef.child('vistahacka/coachmapping/' + val.id);
        const coachs = {
            status: 'rejected'
        };
        documentRef.update(coachs);
        this.coachResponseListShow = true;
    }

    review(val: any) {
        const rootRef = firebase.database().ref();
        const documentRef = rootRef.child('vistahacka/coachmapping/' + val.id);
        const coachs = {
            status: 'reviewing'
        };
        documentRef.update(coachs);
        this.dataService.coachSelectedBorrowerEmail = val.borrowerEmail;
        this.router.navigateByUrl('user/reviewborrower?email=' + val.borrowerEmail + '&id=' + val.id + '&uid=' + val.uid);
        this.coachResponseListShow = true;
    }

    closeMessage() {
        this.coachResponseListShow = false;
        // this.router.navigateByUrl('user/userdashboard');
    }

    navigate(url: string) {
        this.dataService.showNotification = false;
        this.coachProductSuggestedResponseListShow = false;
        this.router.navigateByUrl(url);
    }
}
