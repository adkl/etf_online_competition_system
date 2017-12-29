import { Component, OnInit } from '@angular/core'
import { DashboardService } from 'app/services/dashboard.service'
import { Config } from 'app/config/config'
import { Testability } from '@angular/core/src/testability/testability';
import { Test } from 'app/dashboard/test';
import { Router } from '@angular/router';
import { SpinnerComponent } from 'angular2-spinner/dist';

declare var swal: any;
@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    tests: Test[] = [];
    submittedTests: Test[] = [];
    show_spinner: boolean = false;

    constructor(
        private dashboardService: DashboardService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getTests();
        this.getSubmittedTests();
    }

    getTests() {
        this.dashboardService.getTests().toPromise().then(
            res => {
                this.tests = res.json();
            }
        )
    }

    // takeTest(id) {
    //     this.router.navigate([`/take-test/${id}`])
    // }

    takeTest(id): void {
        this.toggleSpinner();
        this.dashboardService.getSingleTest(id)
            .toPromise()
            .then(res => {
                this.toggleSpinner();
                this.router.navigate([`/take-test/${id}`])
            }).catch(err => {
                this.toggleSpinner();
                swal({
                    title: 'Response error!',
                    text: err.json().error,
                    type: 'error',
                });
            })
    }

    toggleSpinner(): void {
        this.show_spinner = !this.show_spinner
    }

    getSubmittedTests() {
        this.dashboardService.getSubmittedTests().toPromise().then(
            res => {
                this.submittedTests = res.json();
            }
        )
    }

    navigateSubmittedTest(scheduled_test_id) {
        this.router.navigate([`/submitted-test/${scheduled_test_id}`])
    }
}
