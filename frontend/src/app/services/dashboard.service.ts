import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {
    constructor (private http: Http) {}

    getTests(url) {
        return this.http.get(url);
    }
}