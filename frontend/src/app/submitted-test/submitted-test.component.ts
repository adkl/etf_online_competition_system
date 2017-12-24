import { DashboardService } from 'app/services/dashboard.service'
import { ActivatedRoute, Params } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SubmittedTest } from '../take-test/test-application'


@Component({
    selector: 'submitted-test',
    templateUrl: 'submitted-test.component.html',
    styleUrls: ['submitted-test.component.css']
})
export class SubmittedTestComponent implements OnInit {
    submittedTest: SubmittedTest


    constructor(
        private dashboardService: DashboardService,
        private router: ActivatedRoute,
        private route: Router
    ) { }

    ngOnInit(): void {
        let testId
        this.router.params.forEach((params: Params) => {
            testId = params['id'];
        })
        this.getSubmittedTest(testId);
    }

    getSubmittedTest(id): void {
        this.dashboardService.getSubmittedTest(id)
            .toPromise()
            .then(res => {
                this.submittedTest = res.json()
            })
    }
}