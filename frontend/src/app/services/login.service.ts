import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  constructor (
    private http: Http
  ) {}

  login(url, body) {
      return this.http.post(url, body);
  }

  register(url, body) {
      return this.http.post(url, body);
  }
}