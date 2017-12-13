import { DashboardService } from 'app/services/dashboard.service'
import { Component, OnInit } from '@angular/core'


@Component({
    selector: 'take-test',
    templateUrl: 'take-test.component.html',
    styleUrls: ['take-test.component.css']
})
export class TakeTestComponent implements OnInit {
    test;

    constructor(private dashboardService: DashboardService) {

    }

    ngOnInit(): void {
        //this.getTest();
    }

    getTest() {
        this.dashboardService.getSingleTest(1)
            .toPromise()
            .then(res => {
                this.test = res
            })
    }
}