import { DashboardService } from 'app/services/dashboard.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { TestSetup, ScheduledTest, TestSubmit } from './test-application'
import { Answer } from 'app/take-test/answer';


@Component({
    selector: 'take-test',
    templateUrl: 'take-test.component.html',
    styleUrls: ['take-test.component.css']
})
export class TakeTestComponent implements OnInit {
    testId: number;
    scheduledTest: ScheduledTest;
    testSubmit: TestSubmit;

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

    initializeSubmitTest(): void {
        this.testSubmit = new TestSubmit();
        
    }
}