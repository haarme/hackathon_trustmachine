import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
    selector: 'app-userwelcome',
    templateUrl: 'userwelcome.component.html',
    styleUrls: ['userwelcome.component.scss']
})
export class UserWelcomeComponent {

    constructor(
        private router: Router,
        private storage: Storage,
        private menuCntrl: MenuController,
        private alertController: AlertController,
        public dataService: DataService,
        private db: AngularFireDatabase
    ) {
       this.getCoachProductSugggestedList();
    }

    navigate(nav: string) {
        this.router.navigateByUrl(nav);
    }

    getCoachProductSugggestedList() {
        this.db.list('/vistahacka/suggestedproducts').valueChanges()
        .subscribe((data: any) => {
            // this.dataService.isFinascialForecastCompleted = false;
            // this.dataService.isSuggestedProductCompleted = false;
            // this.dataService.showNotification = false;
            const result = data.filter(x => x.borrowerEmail === this.dataService.email && x.status === 'suggested');
            result.forEach(element => {
                this.dataService.isFinascialForecastCompleted = true;
                this.dataService.isSuggestedProductCompleted = true;
                this.dataService.showNotification = true;
            });
        });
    }

    hideMessage() {
        this.dataService.showNotification = false;
        // this.dataService.isSuggestedProductCompleted = false;
        // this.dataService.isFinascialForecastCompleted = false;
    }
}
