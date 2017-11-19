import { Component } from '@angular/core'
import { LoginService } from 'app/services/login.service'
import { Router } from '@angular/router'

@Component ({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class login {
    status:boolean = true
    router:Router
    loginService:LoginService

    username:string = ''
    password:string = ''
    name:string = ''
    lastName:string = ''
    eMail:string = ''

    token:string = ''

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
            console.log("Empty username or password!!!");
        }
        else {
            var url = "localhost:8000/api-token-auth/"
            var body = "username=".concat(this.username).concat("&password=").concat(this.password);
            this.loginService.login(url, body).subscribe(
                data => {
                    this.router.navigate(['/app/dashboard/dashboard.component.html']);
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