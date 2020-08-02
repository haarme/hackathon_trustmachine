import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { IUser } from '../models/User';

@Component({
    selector: 'app-login-page',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

    public email = 'niaguzman@gmail.com';
    public password = 'password';
    loading: boolean;

    constructor(
        public dataService: DataService,
        private router: Router,
        private storage: Storage,
        private db: AngularFireDatabase
    ) { }

    public ngOnInit(): void {
        this.loading = true;
        this.storage.forEach((value, key) => {
            switch(key) {
                case 'uid':
                    this.dataService.uid = value;
                    break;
                case 'email':
                    this.dataService.email = value;
                    break;
                case 'name':
                    this.dataService.name = value;
                    break;
                case 'userType':
                    this.dataService.userType = value;
                    break;
                case 'avatarUrl':
                    this.dataService.avatarUrl = value;
                    break;
                case 'coachEmail':
                    this.dataService.coachEmail = value;
                    break;
            }
        })
        .finally(() => {
            this.loading = false;
            // if (this.dataService.uid) {
            //     this.router.navigateByUrl('userwelcome');
            // }
        });
    }

    public login(): void {
        if (this.email.trim().length > 0 && this.password.trim().length > 0) {
            const usersList = this.db.list('/vistahacka/userinfo/').valueChanges();
            usersList.subscribe((data: IUser[]) => {
                const result = data.filter(x => x.email === this.email && x.password === this.password);
                if (result && result.length > 0) {
                    this.dataService.name = result[0].name;
                    this.dataService.email = result[0].email;
                    this.dataService.userType = result[0].userType;
                    this.dataService.avatarUrl = result[0].avatarUrl;
                    this.dataService.coachEmail = result[0].mycoach;
                    this.storage.set('uid', result[0].uid);
                    this.storage.set('name', result[0].name);
                    this.storage.set('email', result[0].email);
                    this.storage.set('avatarUrl', result[0].avatarUrl);
                    this.storage.set('userType', result[0].userType);
                    this.storage.set('coachEmail', result[0].mycoach);
                    if (this.dataService.userType === 'coach') {
                        this.router.navigateByUrl('user/coachdashboard');
                    }
                    else {
                        this.router.navigateByUrl('userwelcome');
                    }
                }
                else {
                    this.dataService.presentErrorToast('Failed to Login.');
                }
            });
        }
        else {
            this.dataService.presentErrorToast('Invalid login');
        }
        // const payload = {
        //     UserEmail: this.email,
        //     Password: this.password
        // };
        // this.dataService.loading$.next(true);
        // this.dataService.login(payload).subscribe(res => {
        //     this.dataService.loading$.next(false);
        //     if (res && res.UserEmail) {
        //         if (res.DeliveryNumber && res.DeliveryNumber.length && !res.IsHomeDeliveryAvailable) {
        //             res.IsHomeDeliveryAvailable = true;
        //         }
        //         this.storage.clear();
        //         this.storage.set('userData', JSON.stringify(res));
        //         this.dataService.loggedInShopDetails = res;
        //         console.log("this.dataService.loggedInShopDetails");
        //         console.log(this.dataService.loggedInShopDetails);
        // this.router.navigateByUrl("user/userdashboard");
        //     }
        //     else {
        //         this.dataService.presentErrorToast("Invalid Email Id or Password");
        //     }
        // },
        // () => {
        //     this.dataService.loading$.next(false);
        //     this.dataService.presentErrorToast("Failed to Login!");
        // });
    }

    public signUp(): void {
        this.router.navigateByUrl('getlocation');
    }
}
