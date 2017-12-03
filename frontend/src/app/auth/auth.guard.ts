import { Injectable }          from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { AuthService }         from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        if (this.authService.isLoggedIn) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}

@Injectable()
export class AuthGuardDeactivate implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    
    canActivate() {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/dashboard']);
            return false;
        }
        return true;
    }
}
