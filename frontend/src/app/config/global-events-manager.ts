import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class GlobalEventsManager {
    public showNavBar: EventEmitter<boolean> = new EventEmitter<boolean>();
    public showFooter: EventEmitter<boolean> = new EventEmitter<boolean>();
    public role: EventEmitter<string> = new EventEmitter<string>();
    public loggedInUsername: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}
}