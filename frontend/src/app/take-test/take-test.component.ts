import { DashboardService } from 'app/services/dashboard.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { TestSetup, ScheduledTest } from './test-application'


@Component({
    selector: 'take-test',
    templateUrl: 'take-test.component.html',
    styleUrls: ['take-test.component.css']
})
export class TakeTestComponent implements OnInit {
    testId: number;
    scheduledTest: ScheduledTest;

    constructor(
        private dashboardService: DashboardService,
        private router: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.router.params.forEach((params: Params) => {
            this.testId = params['id'];
        })
        this.getTest(this.testId);
    }

    getTest(id): void {
        let _this = this;
        this.dashboardService.getSingleTest(id)
            .toPromise()
            .then(res => {
                console.log(res)
                _this.scheduledTest = res.json()
            })
    }
}