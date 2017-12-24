import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Config } from 'app/config/config';

import { Test } from 'app/dashboard/test';

@Injectable()
export class DashboardService {

    TESTS_API_ROUTE = '/api/scheduled-tests/available-tests/'
    SINGLE_TEST_API_ROUTE(id) {
        return `/api/scheduled-tests/${id}/`
    }
    SUBMIT_TEST_ROUTE = '/api/scheduled-test-result/'

    constructor(private http: AuthHttp) { }

    getTests() {
        return this.http.get(Config.BASE_URL + this.TESTS_API_ROUTE);
    }

    getSingleTest(id) {
        return this.http.get(Config.BASE_URL + this.SINGLE_TEST_API_ROUTE(id));
    }

    submitSingleTest(body) {
        return this.http.post(Config.BASE_URL + this.SUBMIT_TEST_ROUTE, body);
    }

    getSubmittedTests(){
        return this.http.get(Config.BASE_URL + '/api/scheduled-tests/submitted-tests/')
    }

}