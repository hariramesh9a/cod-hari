import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { StoresService } from '../services/stores.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QueueComponent } from './queue/queue.component';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    webForm: FormGroup;
    areStoresAvailable = false;
    stores;
    params;
    pushPage: any;

    constructor(private fb: FormBuilder, private service: StoresService, private route: Router, private activatedRoute: ActivatedRoute, public navCtrl: NavController) {

        this.webForm = this.fb.group({
            zip: ['', [Validators.required, Validators.pattern('(^\\d{5}$)|(^\\d{9}$)|(^\\d{5}-\\d{4}$)')]],
        });

        this.pushPage = QueueComponent;
        this.params = { id: 42 };
    }

    onSubmit() {

        if (!this.webForm.valid) {
            return false;
        } else {

            this.service.getStores().subscribe(
                data => {

                    console.log(data);
                    this.stores = data;
                    this.areStoresAvailable = true;


                },
                error1 => {
                    console.log('err' + error1);
                }
            );


        }
    }

    login(User): void {
        this.navCtrl.navigateForward(['queue'], { queryParams: { user: User }, relativeTo: this.activatedRoute });
    }


    navigateToOtherPage(): void {
        this.navCtrl.navigateForward(['queue'], { queryParams: { store: 1 }, relativeTo: this.activatedRoute });
    }

}
