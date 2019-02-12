import { StoreService } from './../../core/services/store.service';
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
  usernameForm: FormGroup;
  passwordForm: FormGroup;
  showPassword: boolean;
  invalid: boolean;
  showPasswordType: boolean;

  constructor(private router: Router,
    private fb: FormBuilder,
    private store: StoreService,
    private authenticationService: AuthenticationService) {
    this.usernameForm = fb.group({
      username: ['', Validators.required]
    });
    this.passwordForm = fb.group({
      password: ['', Validators.required]
    });
    this.invalid = false;
  }

  ngOnInit() {
    this.showPasswordType = false;
    this.showPassword = false;
  }
  navigate() {
    this.authenticationService.login(this.usernameForm.get('username').value, this.passwordForm.get('password').value).subscribe(res => {
      console.log(res);
      if (res['authorization']) {
        this.store.loggedIn.next(true);
        this.router.navigate(['/dashboard']);
      } else {
        this.invalid = true;
      }
    });
  }
  goBack() {
    this.showPassword = false;
    this.usernameForm.reset();
    this.passwordForm.reset();
  }

  onLoginSubmit() {
    this.showPassword = true;
    this.invalid = false;
  }
}
