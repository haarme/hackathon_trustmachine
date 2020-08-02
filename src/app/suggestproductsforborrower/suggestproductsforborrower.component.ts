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
    selector: 'app-suggestproductsforborrower',
    templateUrl: 'suggestproductsforborrower.component.html',
    styleUrls: ['suggestproductsforborrower.component.scss']
})
export class SuggestProductsForBorrowerComponent {

    id: string;
    uid: string;
    name: string;
    email: string;
    borrowerList: IUser[] = [];
    productList: any[] = [];

    constructor(
        public router: Router,
        private storage: Storage,
        private menuCntrl: MenuController,
        private alertController: AlertController,
        public dataService: DataService,
        private db: AngularFireDatabase,
        private actRoute: ActivatedRoute
    ) {
      this.productList.push(...this.dataService.productList);

      const usersList = this.db.list('/vistahacka/userinfo/').valueChanges();
      usersList.subscribe((data: any) => {
        const result = data.filter(x => x.email === this.dataService.coachTempEditBorrowerEmail);
        if (result && result.length > 0) {
          this.name = result[0].name;
          this.email = result[0].email;
        }
      });
    }

    ionViewDidEnter() {
      this.getProducts();
    }

    getProducts() {
      this.dataService.loading$.next(true);
      this.db.list('/vistahacka/suggestedproducts/', ref => ref.limitToLast(25)).valueChanges()
        .subscribe(
          (data: any) => {
            const filtererList = data.filter(x => x.borrowerEmail === this.dataService.email)[0];

            for (const iterator1 of filtererList.productList) {
              this.productList.filter(x => x.id === iterator1).map(x => x.ischecked = true);
            }
          },
          error => {
            this.dataService.loading$.next(false);
          }
        );
      this.dataService.loading$.next(false);
    }

    save() {
      const idList: string[] = [];
      this.productList.filter(x => x.ischecked).forEach(x => idList.push(x.id));
      const rootRef = firebase.database().ref();
      const guid: any = Guid.newGuid();
      const documentRef = rootRef.child('vistahacka/suggestedproducts/' + guid?.value);
      const suggestedproducts = {
        id: guid?.value,
        coachEmail: this.dataService.email,
        borrowerEmail: this.email,
        borrowerName: this.name,
        productList: idList,
        status: 'suggested'
      };
      documentRef.update(suggestedproducts);
      this.dataService.presentSuccessToast('Request sent successfully');
      this.dataService.isSuggestedProductCompleted = true;
      this.dataService.isFinascialForecastCompleted = true;
      this.router.navigateByUrl('user/coachdashboard');
    }
}
