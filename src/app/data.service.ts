import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Guid } from './guid';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public newUid: any = Guid.newGuid();
    public uid: any;
    public baseUrl: string;
    public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public userCurrentLocation: any = undefined;
    public avatarUrl = 'assets/images/profile.png';
    public displayName = 'User';
    public languageId = '';
    public name = 'User';
    public mobile: string;
    public userTitle = 'Farmer';
    public email = 'user@email.com';
    public userType = 'borrower';
    public coachUserName = 'anoop';
    public coachEmail = undefined;
    public chatMessageCount = 0;
    public showNotification: boolean;
    public currencyCode = '$ ';
    public coachSelectedBorrowerEmail = 'syed@finastra.com';
    public coachTempEditBorrowerEmail = 'syed@finastra.com';
    public languageId$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
    public purposeOfLoan: string;
    public loanAmount: string;
    public termOfLoan: string;
    public productList: any[] = [];


    public isLearningCompleted: boolean = false;
    public isLoanDetailsCompleted: boolean = false;
    public isSuggestedProductCompleted: boolean = false;
    public isFinascialForecastCompleted: boolean = false;

    constructor(
        private httpClient: HttpClient,
        private toastController: ToastController,
        private storage: Storage,
        private router: Router
    ) {
        this.newUid = this.newUid?.value;

        // this.storage.get('uid').then(result => {
        //     this.newUid = result;
        //     if (result) {
        //         const rootRef = firebase.database().ref();
        //         const documentRef = rootRef.child('vistahacka/userinfo/' + result);
        //         documentRef.once('value').then((userData: any) => {
        //             if (userData) {
        //                 this.uid = userData.uid;
        //                 this.name = userData.name;
        //                 this.email = userData.email;
        //                 this.languageId = userData.languageId;
        //                 this.languageId$.next(userData.languageId);
        //                 this.avatarUrl = userData.profilePhoto;
        //             }
        //         });
        //     }
        // });

        this.productList.push({id: '1', name: '15000', percentage: '.5', years: '3', ischecked: false});
        this.productList.push({id: '2', name: '17000', percentage: '1', years: '6', ischecked: false});
        this.productList.push({id: '3', name: '13000', percentage: '2', years: '3', ischecked: false});
        this.productList.push({id: '4', name: '20000', percentage: '1.5', years: '6', ischecked: false});
        this.productList.push({id: '5', name: '12000', percentage: '4.5', years: '4', ischecked: false});
        this.productList.push({id: '6', name: '15000', percentage: '3.5', years: '3', ischecked: false});
        this.productList.push({id: '7', name: '20000', percentage: '2', years: '4', ischecked: false});

        if (this.uid === undefined) {
            // this.email = 'anoop@finastra.com';
            this.router.navigateByUrl('login');
        }
    }

    public get(url: string): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.append('Accept', 'application/json');
        const options = { headers: httpHeaders };
        return this.httpClient.get(url, options);
    }

    public post(url: string, payload: any): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.append('Accept', 'application/json');
        const options = { headers: httpHeaders };
        return this.httpClient.post(url, payload, options);
    }

    public put(url: string, payload: any): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.append('Accept', 'application/json');
        const options = { headers: httpHeaders };
        return this.httpClient.put(url, payload, options);
    }

    public delete(url: string): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.append('Accept', 'application/json');
        httpHeaders.append('Content-Type', 'application/json');
        const options = { headers: httpHeaders };
        return this.httpClient.delete(url, options);
    }

    public login(payload: any): Observable<any> {
        const url = `${this.baseUrl}user/login`;
        return this.post(url, payload);
    }

    public register(payload: any): Observable<any> {
        const url = `${this.baseUrl}user/register`;
        return this.post(url, payload);
    }

    public updateProfile(payload: any): Observable<any> {
        const url = `${this.baseUrl}user/updateprofile`;
        return this.post(url, payload);
    }

    public async presentSuccessToast(showMessage: string) {
        const toast = await this.toastController.create({
            duration: 2000,
            color: 'success',
            message: showMessage
        });
        toast.present();
    }

    public async presentErrorToast(showMessage: string) {
        const toast = await this.toastController.create({
            duration: 2000,
            color: 'danger',
            message: showMessage
        });
        toast.present();
    }

    public async presentMessageToast(showMessage: string) {
        const toast = await this.toastController.create({
            duration: 10000,
            color: 'warning',
            message: showMessage
        });
        toast.present();
    }
}
