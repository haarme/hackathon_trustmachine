import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-educate',
    templateUrl: 'educate.component.html',
    styleUrls: ['educate.component.scss']
})
export class EducateComponent {
    public questionnaireList: Array<any> = [];

    constructor(
        private router: Router,
        private storage: Storage,
        private menuCntrl: MenuController,
        private alertController: AlertController
    ) { }

    ionViewDidEnter() { }

    takeTest() {
        this.router.navigateByUrl('user/questionnaire');
    }

}
