import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { IUser } from '../models/User';
import * as firebase from 'firebase';

@Component({
  selector: 'app-borrowerpersonalinfo',
  templateUrl: 'borrowerpersonalinfo.component.html',
  styleUrls: ['borrowerpersonalinfo.component.scss']
})
export class BorrowerPersonalInfoComponent {

  public name: string;
  public mobile: string;
  public dob = '1980-01-01';
  public education: string;
  public educationList: any[] = ['Secondary School', 'High School', 'College (Diploma, Bachelors)', 'University (Masters, PhD)'];

  public businessList: any[] = ['Construction', 'Agriculture',
    'Education', 'Retail', 'Tourism', 'Manufacturing', 'Wholesale/distribution'];

  constructor(
    public router: Router,
    public dataService: DataService,
    private storage: Storage,
    private db: AngularFireDatabase
  ) { }

  ionViewDidEnter() { }

  next() {
    this.storage.get('uid').then(result => {
      if (result) {
        const rootRef = firebase.database().ref();
        const documentRef = rootRef.child('vistahacka/userinfo/' + result);
        const document = {
          name: this.name,
          mobile: this.mobile,
          dob: this.dob,
          education: this.education,
        };
        documentRef.update(document);
        this.dataService.name = this.name;
        this.dataService.mobile = this.mobile;
        this.storage.set('name', this.name);
        this.storage.set('mobile', this.mobile);
        // this.router.navigateByUrl('borrowerbusinessinfo');
        this.router.navigateByUrl('userwelcome');
      }
    },
      () => this.dataService.presentErrorToast('Failed to get data'));


    // this.storage.get('uid').then(result => {
    //     if (result) {
    //       const rootRef = firebase.database().ref();
    //       const documentRef = rootRef.child('vistahacka/userinfo/' + result);
    //       const document = {
    //         name: this.name,
    //         mobile: this.mobile,
    //         dob: this.dob,
    //         education: this.education,
    //       };
    //       documentRef.update(document);
    //       // this.dataService.name = this.name;
    //       // this.dataService.mobile = this.mobile;
    //       // this.storage.set('name', this.name);
    //       // this.storage.set('mobile', this.mobile);
    //       this.router.navigateByUrl('borrowerbusinessinfo');
    //     }
    //     else {
    //       this.router.navigateByUrl('getlocation');
    //     }
    // });
  }
}
