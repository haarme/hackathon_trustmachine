import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as HighCharts from 'highcharts';

@Component({
    selector: 'app-details-page',
    templateUrl: 'expenses.component.html',
    styleUrls: ['expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
    public expenseList: Array<any> = [];

    constructor(
        private router: Router,
        private storage: Storage,
        private menuCntrl: MenuController,
        private alertController: AlertController
    ) {

    }

    ionViewDidEnter() {
      if (this.expenseList.length === 0) {
        this.expenseList.push({name: 'Staff Costs', amount: '356', y: 356});
        this.expenseList.push({name: 'Fixed overheads', amount: '187', y: 187});
        this.expenseList.push({name: 'Variable overheads', amount: '200', y: 200});
        this.expenseList.push({name: 'Loan outstandings', amount: '785', y: 785});
      }
      this.plotSimplePieChart();
    }

    plotSimplePieChart() {
      let myChart = HighCharts.chart('highcharts', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: 'black'
              }
            }
          }
        },
        series: [{
          name: 'Brands11',
          colorByPoint: true,
          type: undefined,
          data: this.expenseList
        }]
      });
    }

    public ngOnInit(): void {
      // this.expenseList = undefined;
    }
}
