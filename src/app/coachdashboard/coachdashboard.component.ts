import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';
import { IUser } from '../models/User';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-coachdashboard',
  templateUrl: 'coachdashboard.component.html',
  styleUrls: ['coachdashboard.component.scss']
})
export class CoachDashboardComponent {

  userInfo: IUser;
  id: string;
  uid: string;
  borrowerList: IUser[] = [];

  constructor(
    private router: Router,
    private storage: Storage,
    private menuCntrl: MenuController,
    private alertController: AlertController,
    private dataService: DataService,
    private db: AngularFireDatabase,
    private actRoute: ActivatedRoute
  ) { }

  navigate(nav: string) {
    this.router.navigateByUrl(nav);
  }

  ionViewDidEnter() {
    this.id = this.actRoute.snapshot.queryParams.id;
    this.uid = this.actRoute.snapshot.queryParams.uid;
    this.getBorrwers();
  }

  getBorrwers() {
    this.dataService.loading$.next(true);
    this.db.list('/vistahacka/userinfo/', ref => ref.limitToLast(25)).valueChanges()
      .subscribe(
        (data: any) => {
          this.borrowerList = [];
          data.filter(x => x.mycoach === this.dataService.email).forEach(element => {
            this.borrowerList.push(element);
          });
          this.dataService.loading$.next(false);
        },
        error => {
          this.dataService.loading$.next(false);
        }
      );
  }

  chooseBorrower(borrower: IUser) {
    this.dataService.coachSelectedBorrowerEmail = borrower.email;
  }

  chat(borrower: IUser) {
    this.dataService.coachSelectedBorrowerEmail = borrower.email;
    this.router.navigateByUrl('user/chat');
  }

  review(borrower: IUser) {
    this.dataService.coachSelectedBorrowerEmail = borrower.email;
    this.router.navigateByUrl('user/reviewborrower?uid=' + borrower.uid);
  }

  accept() {
    const rootRef = firebase.database().ref();
    const documentRef = rootRef.child('vistahacka/coachmapping/' + this.id);
    const coachs = {
      status: 'accepted'
    };
    documentRef.update(coachs);

    const userRef = rootRef.child('vistahacka/userinfo/' + this.uid);
    const mycoach = {
      mycoach: this.dataService.email
    };
    userRef.update(mycoach);
  }

  reject() {
    const rootRef = firebase.database().ref();
    const documentRef = rootRef.child('vistahacka/coachmapping/' + this.id);
    const coachs = {
      status: 'rejected'
    };
    documentRef.update(coachs);
  }
}
