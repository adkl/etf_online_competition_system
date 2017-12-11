import { Component, OnInit } from '@angular/core'
import { DashboardService } from 'app/services/dashboard.service'
import { Config } from 'app/config/config'
import { Testability } from '@angular/core/src/testability/testability';
import { Test } from 'app/dashboard/test';

@Component ({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    tests:Test[] = [];

    constructor(private dashboardService:DashboardService) {}

    ngOnInit() {
        //this.getTests();
        this.tests.push(new Test(1, "12.01.2018 14:00:00", 30));
    }

    getTests() {
        var promise;
        promise = this.dashboardService.getTests().subscribe(
            tests => {
                this.tests = tests;
            }
        );
        console.log(this.tests);
    }
}
