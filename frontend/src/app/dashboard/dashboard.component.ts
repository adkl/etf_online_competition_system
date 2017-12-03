import { Component, OnInit } from '@angular/core'
import { DashboardService } from 'app/services/dashboard.service'
import { Config } from 'app/config/config'

@Component ({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    tests:JSON

    constructor(private dashboardService:DashboardService) {}

    ngOnInit() {
        this.getTests();
    }

    getTests() {
        var promise;
        promise = this.dashboardService.getTests().toPromise().then(
            res => {
                this.tests = res.json();
            }
        )
    }
}
