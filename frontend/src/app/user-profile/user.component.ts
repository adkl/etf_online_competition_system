import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from './user';
import {UserService} from './user.service';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.css']
})
export class UserComponent  {

    user: User;

    constructor(private userService: UserService,
        private router: Router
    ) {
        // this.getUser();
     }


    // getUser() {
    //     this.userService.getUser()
    //         .then(user => this.user = user);
    // }

}