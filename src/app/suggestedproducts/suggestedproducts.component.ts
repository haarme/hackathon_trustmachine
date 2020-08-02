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
    selector: 'app-suggestedproducts',
    templateUrl: 'suggestedproducts.component.html',
    styleUrls: ['suggestedproducts.component.scss']
})
export class SuggestedProductsComponent {

    selectedProduct: string;
    id: string;
    uid: string;
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

            this.dataService.loading$.next(false);
          },
          error => {
            this.dataService.loading$.next(false);
          }
        );
    }

    save() {
      const idList: string[] = [];
      this.productList.filter(x => x.ischecked).forEach(x => idList.push(x.id));
      const rootRef = firebase.database().ref();

      const userRef1 = rootRef.child('vistahacka/userinfo/' + this.dataService.uid);
      const myproducts1 = {
        product: this.selectedProduct
      };
      userRef1.update(myproducts1);

      const userRef = rootRef.child('vistahacka/userinfo/' + this.dataService.uid + '/loanApplication');
      const myproducts = {
            status: 'updated',
      };
      userRef.update(myproducts);

      this.db.list('/vistahacka/suggestedproducts').valueChanges().subscribe((data: any) => {
            const result = data.filter(x => x.borrowerEmail === this.dataService.email && x.status === 'suggested');

            const suggestedproductsRef = rootRef.child('vistahacka/suggestedproducts/' + result[0].id);
            const suggestedproducts = {
              status: 'updated',
            };
            suggestedproductsRef.update(suggestedproducts);
      });

      this.dataService.isSuggestedProductCompleted = true;
      this.dataService.isFinascialForecastCompleted = true;
      this.dataService.showNotification = false;
      this.router.navigateByUrl('userwelcome');
    }





    // this.db.list('/vistahacka/suggestedproducts').valueChanges()
    //     .subscribe((data: any) => {
    //         this.coachProductSuggestedList = [];
    //         const result = data.filter(x => x.borrowerEmail === this.dataService.email && x.status === 'suggested');
    //         result.forEach(element => {
    //             this.dataService.isSuggestedProductCompleted = true;
    //             this.dataService.showNotification = true;
    //             this.coachProductSuggestedList.push(element);
    //         });
    //         this.dataService.showNotification = true;
    //     });
}
