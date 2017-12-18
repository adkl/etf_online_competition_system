import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Router } from '@angular/router';
import {Config} from '../config/config';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

    isLoggedIn: boolean = false;
    role: string = "";
    loggedInUsername: string;

    constructor(public http: Http, public config: Config, public router: Router) {
        this.isLoggedIn = !!localStorage.getItem('token');
        this.loggedInUsername = localStorage.getItem('loggedInUsername');
    }

    login(username, password) {

        let data = {
            username: username,
            password: password
        }

        let contentHeaders = new Headers();
        contentHeaders.append('Content-Type', 'application/json');
        this.loggedInUsername = username;
        return this.http.post(this.config.BASE_URL + '/api-token-auth/', JSON.stringify(data), { headers: contentHeaders })
            .toPromise()
            .then(response => this.handleSuccess(response))
            .catch(this.handleError);
    }

    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn = false;

        localStorage.removeItem('role');
        this.role = "";

        localStorage.removeItem('loggedInUsername');
        this.loggedInUsername = "";


    }

    private handleSuccess(response: any) {
        localStorage.setItem('token', response.json().token);

        // let role = JSON.parse(response.json().role);

        this.isLoggedIn = true;
        localStorage.setItem('loggedInUsername', this.loggedInUsername);

    }

    private handleError(error: any) {
        var err = error.json();
        var status = err.error_description;
        // swal('Error!', status, 'error');
        return Promise.reject(error.message || error);
    }
}
