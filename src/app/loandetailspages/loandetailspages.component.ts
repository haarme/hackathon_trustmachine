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

@Component({
    selector: 'app-loandetailspages',
    templateUrl: 'loandetailspages.component.html',
    styleUrls: ['loandetailspages.component.scss']
})
export class LoanDetailsPagesComponent {

    id: string;
    uid: string;
    borrowerList: IUser[] = [];

    constructor(
        public router: Router,
        private storage: Storage,
        private menuCntrl: MenuController,
        private alertController: AlertController,
        public dataService: DataService,
        private db: AngularFireDatabase,
        private actRoute: ActivatedRoute
    ) { }

    navigate(nav: string) {
      this.router.navigateByUrl(nav);
    }
}
