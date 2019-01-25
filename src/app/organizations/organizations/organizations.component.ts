import { systemConfig, basePath } from './../../core/config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { endPoints } from '../../core/config';


@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  organizationList: any[];
  constructor(private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.organizationList = [
      'abc', 'abc', 'abs'
    ];
  }

}
