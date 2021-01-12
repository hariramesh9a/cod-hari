import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from '../../services/stores.service';
import { Store } from '../../shared/store.model';
import { Queue } from '../../shared/queue.model';
import { Location } from '@angular/common';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit, OnDestroy {

    store: Store;
    barChart: any;

    queue: Queue;
    user;
    createdCode;
    loading = false;
    barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartColors: Color[] = [
        { backgroundColor: '#3BB9FF' },
        { backgroundColor: '#38ACEC' },
    ];

    barChartLabels: Label[] = ['2013', '2014', '2015', '2016', '2017', '2018'];
    barChartType: ChartType = 'bar';
    barChartLegend = true;
    barChartPlugins = [];

    barChartData: ChartDataSets[] = [
        { data: [2500, 5900, 6000, 8100, 8600, 8050, 1200], label: 'Balance Prediction' }
    ];

    clicked = false;


    constructor(private location: Location, private activatedRoute: ActivatedRoute, private service: StoresService) {

    }



    // Chart events
    public chartClicked(e: any): void {
        console.log(e);
    }
    // Chart events
    public chartHovered(e: any): void {
        console.log(e);
    }

    ngOnInit() {

        this.activatedRoute.queryParams.subscribe(params => {
            this.user = params.user;
            console.log(this.user);
            this.getUserInfo(this.user);

        });


    }

    ngOnDestroy() {
        this.clicked = false;
    }


    getUserInfo(userId) {

        this.service.getStores().subscribe(
            data => {
                const dt = data.filter(x => x.id.toString().trim() === userId.toString());
                this.store = dt[0];
            },
            error1 => {
                console.log('Store errored' + error1);
            }
        );

    }

    backClicked() {
        this.location.back();
    }


    predict(amount) {
        this.loading = true;
        this.clicked = true;
        console.log(amount);
        this.service.predictApi(this.user, amount).subscribe(
            data => {
                this.barChartLabels = data.label;
                this.barChartData = [
                    { data: data.data, label: 'Balance Prediction' }
                ];
                this.loading = false;
            },
            error1 => {
                console.log('REST API call errored' + error1);
                this.service.predict().subscribe(
                    data => {
                        this.barChartLabels = data.label;
                        this.barChartData = [
                            { data: data.data, label: 'Balance Prediction' }
                        ];
                        this.loading = false;
                    },
                    error2 => {
                        console.log('Mock API call errored' + error2);
                        this.loading = false;
                    }
                );
                this.loading = false;
            }
        );

    }





}





