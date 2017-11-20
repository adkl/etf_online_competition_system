import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import {User} from './user';

@Injectable()
export class UserService {

    private userUrl = 'http://localhost:8000/' + 'api/user/2/';

    constructor (private http: Http) {}
    
    getUser(): Promise<User> {

        const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InNpaWkiLCJleHAiOjE1MTEyMTU4MjEsImVtYWlsIjoia29raUBrb2thLmNvbSJ9.jb9AbL_JN3BfeNIsV2-Oj2GBu6BY28H2Pexb7TY1wdY'
        };

        const headerObj = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
        };

        return this.http.get(this.userUrl, headerObj)
            .toPromise()
            .then(response => response.json());
    }


}
//e jesi kod formatirala moja anisa
//eh sad imamo ja msm problem sa corsom xd