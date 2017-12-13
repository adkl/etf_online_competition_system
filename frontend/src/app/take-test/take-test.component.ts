import { DashboardService } from 'app/services/dashboard.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'


@Component({
    selector: 'take-test',
    templateUrl: 'take-test.component.html',
    styleUrls: ['take-test.component.css']
})
export class TakeTestComponent implements OnInit {
    testId: number;

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

    getTest(id) {
        this.dashboardService.getSingleTest(id)
            .toPromise()
            .then(res => {
                // this.test = res
            })
    }
}