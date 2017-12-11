import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Config } from 'app/config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { Headers } from '@angular/http/src/headers';
import { Test } from 'app/dashboard/test';

@Injectable()
export class DashboardService {

    TESTS_API_ROUTE = '/api/scheduled-tests/available-tests/'

    constructor (private http: Http) {}

    getTests(): Observable<Test[]> {
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token')
            })
        });
        return this.http.get(Config.BASE_URL + this.TESTS_API_ROUTE, options).map(
            (response:Response) => response.json()
        );
    }
}