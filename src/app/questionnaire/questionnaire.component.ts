import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: 'questionnaire.component.html',
  styleUrls: ['questionnaire.component.scss']
})
export class QuestionnaireComponent {
  public questionnaireList: Array<any> = [];

  constructor(
    private router: Router,
    private storage: Storage,
    private menuCntrl: MenuController,
    private alertController: AlertController,
    private dataService: DataService
  ) { }

  ionViewDidEnter() {
    if (this.questionnaireList.length === 0) {
      this.questionnaireList.push(
        {
          question: 'Why do many small business owners fall short in their record keeping?',
          options: [
            'Book keeping is too expensive',
            'Book keeping is not essential',
            'Rely on Govt to handle tax filing',
            'Focus on Product and Sales, not book keeping']
        },
        {
          question: 'What is a "cash-flow projection"?',
          options: [
            'Forecasting how much cash will be collected, and how it will be invested',
            'forecasting how much cash must be paid out, and how much is needed to pay that cash out',
            'forecasting how much cash to invest, and how much can be used to pay obligations',
            'forecasting how much cash will be collected, and how much must be paid out']
        },
        {
          question: 'What is nearly universal among individuals who start a small business?',
          options: [
            'They underestimate cash outflows',
            'They underestimate cash inflows',
            'They overestimate cash outflows',
            'They overestimate cash inflows']
        },
        {
          question: 'What must be the first step in preparing a cash forecast?',
          options: [
            'determining the number of cost drivers',
            'determining the hours of operation that can maximize income',
            'identifying all fixed and variable costs',
            'identifying the types of customer you are seeking'],
          other: ' '
        },
        {
          question: 'You have decided to open your small business, and would like to have some professional advice. What should you prepare for when you receive the initial advice from the coach?',
          options: [
            'The coach will not listen to your plans and frustration about the business',
            'The coach will, perhaps painfully, point out the weaknesses of your business that you need to work on first',
            'The coach perhaps, uncomfortably, will provid a road map of how much will need to be invested in the future of the business',
            'The coach will challenge your knowledge of finance, recommend first that you hira a qualified accountant']
        },
        {
          question: 'What is the most common reason for a small business to fail?',
          options: [
            'Small business attempts to grow too fast',
            'Small business has insufficient capital', 'The product or service is incorrectly priced',
            'The product or Service does not satisfy a market need'],
        },
        {
          question: 'If a new small business has cash flow problems, which strategy should the business avoid at all costs?',
          options: [
            'Thinking that growth will regenerate more money',
            'Working to lower the costs incurred in doing business',
            'Slowing down the growth of the business',
            'Devicing ways to remain profitable, without affecting sales'],
        },
        {
          question: 'According to a definition, microfinance is an attempt to improve access to small deposits and small loans for poor households neglected by banks (Schreiner and Colombet (2000, p.339)). Do you agree with this definition of microfinance?',
          options: ['Yes', 'No(please specify the reason)'],
          other: '(please specify the reason)'
        }
      );
    }
  }

  completeTest() {
    this.dataService.isLearningCompleted = true;
    this.router.navigateByUrl('userwelcome');
  }
}
