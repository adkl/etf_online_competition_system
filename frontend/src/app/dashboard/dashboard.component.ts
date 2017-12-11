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
        this.tests.push(new Test(1, "12.01.2018 14:00", 30));
        this.tests.push(new Test(2, "13.01.2018 10:00", 35));
        this.tests.push(new Test(3, "14.01.2018 14:30", 60));
        this.tests.push(new Test(4, "15.01.2018 14:00", 30));
        this.tests.push(new Test(5, "16.01.2018 08:00", 120));
        this.tests.push(new Test(6, "17.01.2018 09:30", 30));
        this.tests.push(new Test(7, "18.01.2018 14:30", 120));
        this.tests.push(new Test(8, "19.01.2018 16:00", 300));
        this.tests.push(new Test(9, "20.01.2018 15:00", 360));
        this.tests.push(new Test(10, "21.01.2018 15:30", 360));
        this.tests.push(new Test(11, "22.01.2018 14:00", 60));
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
