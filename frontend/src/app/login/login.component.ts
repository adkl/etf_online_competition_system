import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Config } from 'app/config/config'
import { GlobalEventsManager } from 'app/config/global-events-manager';
import { AuthService } from 'app/auth/auth.service';
declare var swal: any;
@Component ({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {
    status:boolean = true

    username:string = ''
    password:string = ''
    name:string = ''
    lastName:string = ''
    eMail:string = ''

    token:string = ''

    constructor(private authService: AuthService, private router: Router, private eventsManager: GlobalEventsManager) {}

    click(event){
        if (this.status == true) {
            this.status = false
        }
        else {
            this.status = true
        }
    }

    loginClick(){

        if (this.username == "" || this.password == "") {
            // TODO: proper validation
            swal({
                title: 'Error!',
                text: 'Try again!',
                type: 'error',
                //confirmButtonText: 'Cool'
              })
            console.log("Empty username or password!!!");
        }
        else {
            this.authService.login(this.username, this.password).then((result) => {
                this.eventsManager.loggedInUsername.emit(this.username);
                this.eventsManager.showNavBar.emit(true);
                swal({
                    title: 'Succes!',
                    text: 'Welcome!',
                    type: 'success',
                    //confirmButtonText: 'Cool'
                  })
                this.router.navigate(['/dashboard']);
            }).catch(err => {
                console.error("Error in LoginClick", err);
            })
        }
    }

    registerClick(event){
        if (this.username == "" || this.password == "" 
            || this.name == "" || this.lastName == "" || this.eMail == "") {
            console.log("Error");
        }
        else {
            // todo registration
        }
    }
}