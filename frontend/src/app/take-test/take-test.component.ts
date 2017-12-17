import { DashboardService } from 'app/services/dashboard.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { TestSetup, ScheduledTest, TestSubmit, Answer, SubmitAnswer } from './test-application'


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
        this.dashboardService.getSingleTest(id)
            .toPromise()
            .then(res => {
                // console.log(res)
                this.scheduledTest = res.json()
                this.initializeAnswers();
            })
    }

    initializeAnswers(): void {
        this.scheduledTest.test_setup.questions.forEach(question => {
            question.user_answer = new Answer(question.predefined_answers.length);
        });
    }

    submitTest(): void {
        console.log(this.scheduledTest);
        let testSubmit = new TestSubmit();
        testSubmit.id = this.scheduledTest.id;
        this.scheduledTest.test_setup.questions.forEach(question => {
            // Set selected answers
            let selected = [];
            question.user_answer.selected.map( (p, index) => {
                if( p == true ) 
                    selected.push(question.predefined_answers[index].id)
            });
            let new_answer = new SubmitAnswer(question.id, question.user_answer.text, selected)
            testSubmit.answers.push(new_answer)
        });
        console.log(testSubmit);
        this.dashboardService.submitSingleTest(testSubmit)
            .toPromise()
            .then(res => {
                console.log(res);
            });
    }
}