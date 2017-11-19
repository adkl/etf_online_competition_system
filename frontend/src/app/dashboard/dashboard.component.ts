import { Component, OnInit } from '@angular/core'
import { DashboardService } from 'app/services/dashboard.service'

@Component ({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class Dashboard implements OnInit {
    tests:JSON

    constructor(private dashboardService:DashboardService) {}

    ngOnInit() {
        this.getTests();
    }

    getTests() {
        var promise;
        var url = "localhost:8000/api/scheduled-tests/available-tests/"
        promise = this.dashboardService.getTests(url).toPromise().then(
            res => {
                this.tests = res.json();
            }
        )
    }
}
