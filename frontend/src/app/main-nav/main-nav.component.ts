import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { GlobalEventsManager } from '../config/global-events-manager';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'main-nav',
    //encapsulation: ViewEncapsulation.None,
    styleUrls: ['./main-nav.component.css'],
    templateUrl: './main-nav.component.html'
})

export class MainNavComponent implements OnInit {
    public showMenu: boolean;
    public role: string;
    public showFooter: boolean;
    public loggedInUsername: string;

    constructor(private globalEventsManager: GlobalEventsManager, private authService: AuthService, private router: Router) {

        this.globalEventsManager.showNavBar.subscribe((mode: boolean) => {
            this.showMenu = mode;
        });
        this.globalEventsManager.showFooter.subscribe((mode: boolean) => {
            this.showFooter = mode;
        });
        this.globalEventsManager.role.subscribe((role: string) => {
            this.role = role;
        });
        this.globalEventsManager.loggedInUsername.subscribe((username: string) => {
            this.loggedInUsername = username;
        });
    }

    ngOnInit() {
        this.globalEventsManager.showNavBar.emit(this.authService.isLoggedIn);
        this.globalEventsManager.showFooter.emit(this.authService.isLoggedIn);
        this.globalEventsManager.role.emit(this.authService.role);
        this.globalEventsManager.loggedInUsername.emit(this.authService.loggedInUsername);
    }

    logout() {
        this.globalEventsManager.showNavBar.emit(false);
        this.globalEventsManager.showFooter.emit(false);
        this.globalEventsManager.loggedInUsername.emit("");
        this.globalEventsManager.role.emit("");
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    profile(){
        this.router.navigate(['/profile']);
    }

    // gotoHomePage() {
    //     let link = ['/home'];
    //     this.router.navigate(link);
    // }
}