import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  constructor (private http: Http) {}

  login(url, body):Observable<boolean> {
      let token;
      return this.http.post(url, body).map(
          (response:Response) => {
              let token = response.json();
              if (token && token.token) {
                  localStorage.setItem('currentUser', JSON.stringify(token));
                  return true;
              } 
              else {
                  return false;
              }
          }
      );
  }

  logout() {
      localStorage.removeItem('currentUser');
  }

  register(url, body) {
      return this.http.post(url, body);
  }
}