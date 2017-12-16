import { Answer } from './answer';
 
export class TestSubmit {
    answers: Answer[]
}

export class PredefinedAnswer {
    text: string;
    id: number
}

export class Question {
    text: string;
    questionTypeId: number;
    predefinedAnswers: PredefinedAnswer[];
}

export class TestSetup {
    questions: Question[];    
}

export class ScheduledTest {
    duration: number;
    id: number;
    start: string;
    test_setup: TestSetup;    
}