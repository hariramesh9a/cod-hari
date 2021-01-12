import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Queue } from '../shared/queue.model';
import { Login } from '../shared/login.model';
import { StoreCode } from '../shared/store-code.model';
import { Store } from '../shared/store.model';


@Injectable({
    providedIn: 'root'
})
export class StoresService {
    private storeUrl = 'assets/mock/users.json';
    private queueUrl = 'assets/mock/queue.json';
    private predictUrl = 'assets/mock/prediction.json';

    // private predictApiUrl = 'http://ec2-35-164-84-64.us-west-2.compute.amazonaws.com:5000/?user=';
    private predictApiUrl = 'http://localhost:5000/?user=';

    // user=1&amount=100


    constructor(private http: HttpClient) {
    }


    public getStores(): Observable<any> {
        return this.http.get(this.storeUrl);

    }

    public getQueue(): Observable<Queue> {
        return this.http.get(this.queueUrl);

    }

    public predict(): Observable<any> {
        return this.http.get(this.predictUrl);
    }

    public predictApi(user, amount): Observable<any> {
        return this.http.get(this.predictApiUrl + user + '&amount=' + amount);
    }



}
