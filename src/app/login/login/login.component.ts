import { systemConfig, basePath } from './../../core/config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { endPoints } from '../../core/config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService) {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    if (queryParams && queryParams['code']) {
      this.authenticationService.getToken(queryParams['code']).subscribe((response) => {
        console.log('res', response);
        if (response) {
          this.router.navigate(['dashboard']);
        }
      });
    }
    this.loginForm = fb.group({
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log('login');
  }

  onLoginSubmit() {
    window.location.href = endPoints.login + '?' +
      'scope=openid,openid-email,openid-phone&clientId=' + 'e3a92856d0b4fee31b96e8783ab52007' +
      '&redirect_uri=' + basePath.appPath + '&username=' + this.loginForm.value.username;
  }
}
