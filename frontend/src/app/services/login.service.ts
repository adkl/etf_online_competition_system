import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  constructor (private http: Http) {}

  login(url, body):Observable<boolean> {

    let headers = new Headers({
        'Content-Type': 'application/json'
      });

    return this.http.post(
        url, 
        body, 
        { headers: new Headers({"Content-Type": "application/json"}) } ).map(
        (response:Response) => {
            let tokenResponse = response.json();
            if (tokenResponse && tokenResponse.token) {
                localStorage.setItem('token', JSON.stringify(tokenResponse.token));
                return true;
            } 
            else {
                return false;
            }
        }
    );
  }

  logout() {
      localStorage.removeItem('token');
  }

  register(url, body) {
      return this.http.post(url, body);
  }
}