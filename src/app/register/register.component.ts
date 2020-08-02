import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { IUser } from '../models/User';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register-page',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent {

  public isFormDirty = true;
  public passwordCheckbox: boolean;
  public email: string;
  public password: string;

  constructor(
    public dataService: DataService,
    private router: Router,
    private storage: Storage,
    private db: AngularFireDatabase,
    private alertController: AlertController
  ) { }

  async presentAlert(messageContent: string, messageHeader?: string) {
    const alert = await this.alertController.create({
      header: messageHeader,
      message: messageContent,
      buttons: ['OK']
    });

    await alert.present();
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
    this.passwordCheckbox = !this.passwordCheckbox;
  }

  next() {
    this.storage.get('uid').then(result => {
      if (result) {
        const rootRef = firebase.database().ref();
        const documentRef = rootRef.child('vistahacka/userinfo/' + result);
        const document = {
          email: this.email,
          password: this.password,
          mycoach: '',
          avatarUrl: this.dataService.avatarUrl,
        };
        documentRef.update(document);
        this.dataService.email = this.email;
        this.storage.set('email', this.email);
        this.router.navigateByUrl('photoupload');
      }
      else {
        this.router.navigateByUrl('getlocation');
      }
    },
    () => this.dataService.presentErrorToast('Failed to get data'));
  }

  // // // //   this.storage.get('uid').then(result => {
  // // // //     if (result) {
  // // // //       const usersList = this.db.list('/vistahacka/userinfo/').valueChanges();
  // // // //       usersList.subscribe((data: IUser[]) => {
  // // // //           const resultSet = data.filter(x => x.email === this.email);
  // // // //           // if (resultSet && resultSet.length > 0) {
  // // // //           //   alert('Email already exists.');
  // // // //           // }
  // // // //           // else {
  // // // //           const rootRef = firebase.database().ref();
  // // // //           const documentRef = rootRef.child('vistahacka/userinfo/' + result);
  // // // //           const document = {
  // // // //             email: this.email,
  // // // //             password: this.password,
  // // // //             mycoach: '',
  // // // //             avatarUrl: this.dataService.avatarUrl,
  // // // //           };
  // // // //           documentRef.update(document);
  // // // //           this.dataService.email = this.email;
  // // // //           this.storage.set('email', this.email);
  // // // //           this.router.navigateByUrl('photoupload');
  // // // //           // }
  // // // //       });
  // // // //     }
  // // // //     else {
  // // // //       this.router.navigateByUrl('getlocation');
  // // // //     }
  // // // //   },
  // // // //   () => this.dataService.presentErrorToast('Failed to get data'));
  // // // // }
}
