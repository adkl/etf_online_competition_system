import { Component, OnInit } from '@angular/core'
import { DashboardService } from 'app/services/dashboard.service'
import { Config } from 'app/config/config'
import { Testability } from '@angular/core/src/testability/testability';
import { Test } from 'app/dashboard/test';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    tests: Test[] = [];

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.getTests();
    }

    getTests() {
        this.dashboardService.getTests().toPromise().then(
            res => {
                this.tests = res.json();
            }
        )
    }
}
