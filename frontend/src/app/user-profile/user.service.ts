import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import {User} from './user';
import { Config } from 'app/config/config';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {

    private userUrl = 'http://localhost:8000/' + 'api/user/' ;

    constructor(private http: AuthHttp) { }
    
    // getUser(): Promise<User> {

    //     // const headerDict = {
    //     // 'Content-Type': 'application/json',
    //     // 'Accept': 'application/json',
    //     // 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6InN0dWRlbnRfdXNlciIsImV4cCI6MTUxMTIyNjY2MSwiZW1haWwiOiJlY2VyaWNAZXRmLnVuc2EuYmEifQ.kG6sKevmm1vbTrydZcizfgGo-GejtvTe8m1SM9pqwaI'
    //     // };

    //     // const headerObj = {                                                                                                                                                                                 
    //     // headers: new Headers(headerDict), 
    //     // };

    //     // return this.http.get(this.userUrl)
    //     //     .toPromise()
    //     //     .then(response => response.json());


    // }


}
