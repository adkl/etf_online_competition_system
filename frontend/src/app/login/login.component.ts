import { Component } from '@angular/core'
import { LoginService } from 'app/services/login.service'
import { Router } from '@angular/router'
import { BASE_URL } from 'app/config/constants'

@Component ({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class Login {
    status:boolean = true

    username:string = ''
    password:string = ''
    name:string = ''
    lastName:string = ''
    eMail:string = ''

    token:string = ''

    constructor(private loginService: LoginService, private router: Router) {}

    click(event){
        if (this.status == true) {
            this.status = false
        }
        else {
            this.status = true
        }
    }

    loginClick(event){
        if (this.username == "" || this.password == "") {
            // TODO: proper validation
            console.log("Empty username or password!!!");
        }
        else {
            var url = BASE_URL + "api-token-auth/"
            let body = JSON.stringify({username: this.username, password: this.password})
            this.loginService.login(url, body).subscribe(
                data => {
                    this.router.navigate(['/dashboard']);
                }
            )
        }
    }

    registerClick(event){
        if (this.username == "" || this.password == "" 
            || this.name == "" || this.lastName == "" || this.eMail == "") {
            console.log("Error");
        }
        else {
            var url = "localhost:8000/"
            var body = "username=".concat(this.username).concat("&password=").concat(this.password);
            body.concat("&name=").concat(this.name).concat("&lastName=").concat(this.lastName);
            body.concat("&eMail=").concat(this.eMail);
            
            this.loginService.register(url, body);
        }
    }
}