import { Injectable } from "@angular/core";

@Injectable()
export class Config {
    BASE_URL: string = "http://localhost:8000";
    static BASE_URL: string = "http://localhost:8000";

}
// nesto ovdje nije okej, tebi nista ne importuje xd 