import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/userComponent.component';
import { GetLocationComponent } from './getlocation/getlocation.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './userdashboard/userdashboard.component';
import { PhotoUploadComponent } from './photoupload/photoupload.component';
import { DocumentUploadComponent } from './documentupload/documentupload.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ChatComponent } from './chat/chat.component';
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
import { SuggestedProductsComponent } from './suggestedproducts/suggestedproducts.component';
import { FinancialForecastComponent } from './financialforecast/financialforecast.component';
import { LoanDetailsPagesComponent } from './loandetailspages/loandetailspages.component';
import { SuggestProductsForBorrowerComponent } from './suggestproductsforborrower/suggestproductsforborrower.component';

// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
//   }
// ];
const routes: Routes = [
  // {
  //   path: "loginwithphone",
  //   component: LoginwithphoneComponent
  // },
  // {
  //   path: "phoneauth",
  //   component: PhoneAuthPageComponent
  // },
  {
    path: 'getlocation',
    component: GetLocationComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'photoupload',
    component: PhotoUploadComponent
  },
  {
    path: 'documentupload',
    component: DocumentUploadComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'borrowerpersonalinfo',
    component: BorrowerPersonalInfoComponent
  },
  {
    path: 'borrowerbusinessinfo',
    component: BorrowerBusinessInfoComponent
  },
  {
    path: 'balancesheet',
    component: BalanceSheetComponent
  },
  {
    path: 'userwelcome',
    component: UserWelcomeComponent
  },
  {
    path: 'financialforecast',
    component: FinancialForecastComponent
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'getlocation1',
        component: GetLocationComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'userdashboard',
        component: UserDashboardComponent
      },
      {
        path: 'coachdashboard',
        component: CoachDashboardComponent
      },
      {
        path: 'documentupload',
        component: DocumentUploadComponent
      },
      {
        path: 'expenses',
        component: ExpensesComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'questionnaire',
        component: QuestionnaireComponent
      },
      {
        path: 'selectcoach',
        component: SelectcoachComponent
      },
      {
        path: 'reviewborrower',
        component: ReviewBorrowerComponent
      },
      {
        path: 'borrowerlist',
        component: BorrowerListComponent
      },
      {
        path: 'borrowerpersonalinfo',
        component: BorrowerPersonalInfoComponent
      },
      {
        path: 'borrowerbusinessinfo',
        component: BorrowerBusinessInfoComponent
      },
      {
        path: 'balancesheet',
        component: BalanceSheetComponent
      },
      {
        path: 'cashflow',
        component: CashflowComponent
      },
      {
        path: 'educate',
        component: EducateComponent
      },
      {
        path: 'loanapplication',
        component: LoanapplicationComponent
      },
      {
        path: 'suggestedproducts',
        component: SuggestedProductsComponent
      },
      {
        path: 'suggestproductsforborrower',
        component: SuggestProductsForBorrowerComponent
      },
      {
        path: 'financialforecast',
        component: FinancialForecastComponent
      },
      {
        path: 'loandetailspages',
        component: LoanDetailsPagesComponent
      },
      {
        path: 'tabs',
        children: [
          {
            path: 'details',
            outlet: 'details',
            component: LoginComponent
          },
          {
            path: 'orderlisting',
            outlet: 'orderlisting',
            component: RegisterComponent
          },
          {
            path: 'shopdetails',
            outlet: 'shopdetails',
            component: UserDashboardComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
