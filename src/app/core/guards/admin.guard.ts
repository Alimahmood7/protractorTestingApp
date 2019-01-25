import {AuthenticationService} from './../services/authentication.service';
import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate() {
    if (this.authenticationService.isAdminLoggedIn()) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
