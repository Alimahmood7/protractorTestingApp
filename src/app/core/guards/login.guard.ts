import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private router: Router , private authenticationService: AuthenticationService) {
      console.log('AuthGuard constructor - - - - -- - - ');
    }

    canActivate() {
      if (this.authenticationService.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }
}
