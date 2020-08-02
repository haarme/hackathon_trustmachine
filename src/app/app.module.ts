import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/userComponent.component';
import { GetLocationComponent } from './getlocation/getlocation.component';
import { UserDashboardComponent } from './userdashboard/userdashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { CommonModule } from '@angular/common';
import { PhotoUploadComponent } from './photoupload/photoupload.component';
import { DocumentUploadComponent } from './documentupload/documentupload.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { ChatComponent } from './chat/chat.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SelectcoachComponent } from './selectcoach/selectcoach.component';
import { ReviewBorrowerComponent } from './reviewborrower/reviewborrower.component';
import { BorrowerListComponent } from './borrowerlist/borrowerlist.component';
import { BorrowerPersonalInfoComponent } from './borrowerpersonalinfo/borrowerpersonalinfo.component';
import { BorrowerBusinessInfoComponent } from './borrowerbusinessinfo/borrowerbusinessinfo.component';
import { BalanceSheetComponent } from './balancesheet/balancesheet.component';
import { EducateComponent } from './educate/educate.component';
import { UserWelcomeComponent } from './userwelcome/userwelcome.component';
import { CoachDashboardComponent } from './coachdashboard/coachdashboard.component';
import { CashflowComponent } from './cashflow/cashflow.component';
import { LoanapplicationComponent } from './loanapplication/loanapplication.component';
import { FinancialForecastComponent } from './financialforecast/financialforecast.component';
import { LoanDetailsPagesComponent } from './loandetailspages/loandetailspages.component';
import { SuggestedProductsComponent } from './suggestedproducts/suggestedproducts.component';
import { SuggestProductsForBorrowerComponent } from './suggestproductsforborrower/suggestproductsforborrower.component';

@NgModule({
   declarations: [
      AppComponent,
      UserComponent,
      LoginComponent,
      RegisterComponent,
      UserDashboardComponent,
      FinancialForecastComponent,
      GetLocationComponent,
      PhotoUploadComponent,
      DocumentUploadComponent,
      ExpensesComponent,
      ChatComponent,
      FeedComponent,
      MessageComponent,
      QuestionnaireComponent,
      SelectcoachComponent,
      UserComponent,
      ReviewBorrowerComponent,
      BorrowerListComponent,
      BorrowerPersonalInfoComponent,
      BorrowerBusinessInfoComponent,
      BalanceSheetComponent,
      EducateComponent,
      UserWelcomeComponent,
      CoachDashboardComponent,
      CashflowComponent,
      LoanapplicationComponent,
      LoanDetailsPagesComponent,
      SuggestedProductsComponent,
      SuggestProductsForBorrowerComponent
   ],
   entryComponents: [],
   imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      IonicModule,
      FormsModule,
      CommonModule,
      HttpClientModule,
      IonicStorageModule.forRoot(),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireStorageModule
   ],
   providers: [
      StatusBar,
      SplashScreen,
      Geolocation,
      GoogleMaps,
      Camera,
      File,
      UniqueDeviceID
   ],
   schemas: [
      CUSTOM_ELEMENTS_SCHEMA
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
