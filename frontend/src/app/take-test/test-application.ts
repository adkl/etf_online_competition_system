
export class Answer {
    questionId: number;
    selected: boolean[];
    text: string;
    comment: string;
    points: number;

    constructor(selected_length) {
        this.selected = new Array<boolean>(selected_length);
        this.text = "";
    }
}

export class SubmitAnswer {
    id: number;
    text: string;
    selected: number[]

    constructor(id, text, selected) {
        this.id = id;
        this.text = text;
        this.selected = selected;
    }
}

export class TestSubmit {
    answers: SubmitAnswer[];
    id: number;
    constructor() {
        this.answers = new Array<SubmitAnswer>();
    }
}

export class PredefinedAnswer {
    text: string;
    id: number
}

export class Question {
    id: number;
    text: string;
    question_type: number;
    predefined_answers: PredefinedAnswer[];
    user_answer: Answer;
}

export class TestSetup {
    questions: Question[]; 
    title: string;   
}

export class ScheduledTest {
    duration: number;
    id: number;
    start: string;
    test_setup: TestSetup;   
}


// SUBMITTED TEST DTOs
class SubmittedTestAnswer {
    question: Question;
    comment: string;
    points: number;
    text: string;
    predefined_answers: PredefinedAnswer[];
}


export class SubmittedTest {
    id: number;
    answers: SubmittedTestAnswer[];
    scheduled_test: ScheduledTest;
}