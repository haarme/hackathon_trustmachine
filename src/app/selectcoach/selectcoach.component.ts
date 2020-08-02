import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IUser } from '../models/User';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataService } from '../data.service';
import * as firebase from 'firebase';
import { Guid } from '../guid';

@Component({
  selector: 'app-selectcoach',
  templateUrl: 'selectcoach.component.html',
  styleUrls: ['selectcoach.component.scss']
})
export class SelectcoachComponent {
  public coachList: Array<IUser> = [];

  constructor(
    private router: Router,
    private storage: Storage,
    private menuCntrl: MenuController,
    private alertController: AlertController,
    public dataService: DataService,
    private db: AngularFireDatabase
  ) {
  }

  async ionViewDidEnter() {
    await this.findCoach();
    this.coachList = [];
    this.getCoachList();
  }

  getCoachList() {
    this.dataService.loading$.next(true);
    this.db.list('/vistahacka/userinfo/').valueChanges()
      .subscribe(
        (data: any) => {
          data.filter(x => x.userType === 'coach').forEach(element => {
            this.coachList.push(element);
          });
          this.dataService.loading$.next(false);
        },
        error => {
          this.dataService.loading$.next(false);
        }
      );
  }

  chooseCoach(uid: string, email: string, name: string, avatarUrl: string) {
    const rootRef = firebase.database().ref();
    const guid: any = Guid.newGuid();
    const documentRef = rootRef.child('vistahacka/coachmapping/' + guid?.value);
    const coachs = {
      id: guid?.value,
      uid: this.dataService.uid,
      coachName: name,
      coachEmail: email,
      coachAvatarUrl: avatarUrl,
      borrowerName: this.dataService.name,
      borrowerEmail: this.dataService.email,
      borrowerAvatarUrl: this.dataService.avatarUrl,
      status: 'requested'
    };
    documentRef.update(coachs);
    this.dataService.presentSuccessToast('Request sent successfully');
    this.router.navigateByUrl('userwelcome');
  }

  async findCoach() {
    this.dataService.loading$.next(true);
    await this.delay(2000);
    this.dataService.loading$.next(false);
    this.dataService.presentSuccessToast('Found matching Coaches for you');
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
