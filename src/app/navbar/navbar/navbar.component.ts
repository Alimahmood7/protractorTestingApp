import { Router } from '@angular/router';
import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '../../core/services/store.service';
import { errors } from '../../core/error.messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loading = false;
  searchField: FormControl;
  userType: any;
  constructor(
    private storeService: StoreService,
    public _router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
  }

  get router() {
    return this._router;
  }

  logout() {
    this._router.navigate(['/login']);
  }


}
