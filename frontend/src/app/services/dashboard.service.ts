import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Config } from 'app/config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

    TESTS_API_ROUTE = '/api/scheduled-tests/available-tests/'

    constructor (private http: AuthHttp) {}

    getTests() {
        return this.http.get(Config.BASE_URL + this.TESTS_API_ROUTE);
    }
}