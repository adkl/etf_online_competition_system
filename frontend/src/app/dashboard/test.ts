export class Test {
    id:number
    start:string
    duration:number
    reviwed:boolean
    points_sum:number


    constructor(id:number, start:string, duration:number, reviewed:boolean, points_sum:number) {
        this.id = id;
        this.duration = duration;
        this.start = start;
        this.reviwed = reviewed;
        this.points_sum = points_sum;
    }
}