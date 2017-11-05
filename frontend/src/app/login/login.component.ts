import { Component } from '@angular/core'
import { LoginService } from 'app/services/login.service'

@Component ({
    selector: 'login',
    templateUrl: 'login/login.component.html'
})

export class login {
    status:boolean = true

    loginService:LoginService

    username:string = ''
    password:string = ''
    name:string = ''
    lastName:string = ''
    eMail:string = ''

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
            console.log("Error");
        }
        else {
            var url = "localhost:3000/"
            var body = "username=".concat(this.username).concat("&password=").concat(this.password);
            this.loginService.login(url, body);
        }
    }

    registerClick(event){
        if (this.username == "" || this.password == "" 
            || this.name == "" || this.lastName == "" || this.eMail == "") {
            console.log("Error");
        }
        else {
            var url = "localhost:3000/"
            var body = "username=".concat(this.username).concat("&password=").concat(this.password);
            body.concat("&name=").concat(this.name).concat("&lastName=").concat(this.lastName);
            body.concat("&eMail=").concat(this.eMail);
            
            this.loginService.login(url, body);
        }
    }
}