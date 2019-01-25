import { User, ModalData, UserSuccessResponse } from './../../core/interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { SearchService } from '../../core/services/search.service';
import * as jwt from 'jwt-decode';
import { ModalDirective } from 'ngx-bootstrap';
import { UserManagementService } from '../../core/services/user-management-service';
import { StoreService } from '../../core/services/store.service';
import { errors } from '../../core/error.messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('userInfo') public userInfo: ModalDirective;
  public modalRef: BsModalRef;
  loading = false;
  searchField: FormControl;
  userType: any;
  userData: ModalData;
  profileData: User;
  constructor(private searchService: SearchService,
    private storeService: StoreService,
    public router: Router,
    private authenticationService: AuthenticationService,
    private modalService: BsModalService,
    private userManagementService: UserManagementService) {
    const jwtToken = jwt(localStorage.getItem('accessToken'));
    this.userType = jwtToken['user']['type'];
    console.log(this.userType);

  }

  ngOnInit() {
    this.userData = {
      header: 'PERSONAL INFORMATION',
      block: false,
      user: {
        firstName: '',
        email: '',
        phone: 0,
        username: ''
      }
    };
    this.searchField = new FormControl();
    this.profileData = {
      firstName: '',
      email: '',
      phone: 0,
      username: ''
    };
    this.getUserProfile();
  }

  getUserProfile() {
    console.log('profile');
    this.searchService.getUserProfile().subscribe((data: User) => {
      console.log(data);
      this.userData.user = data;
      this.profileData = data;
    });
  }

  getSearchResultsOnEnter(value) {
    if (value && value.length > 0) {
      this.storeService.showLoading.next(true);
      this.searchService.search(value);
      this.searchField.setValue('');
    }
  }

  openProfileModal(profileModal: any) {
    console.log('profile', this.profileData);
    this.userData = {
      header: 'PERSONAL INFORMATION',
      block: false,
      user: {
        firstName: this.profileData.firstName,
        email: this.profileData.email,
        phone: this.profileData.phone,
        username: this.profileData.username
      }
      //  user: this.profileData
    };
    console.log(this.profileData);
    console.log(this.userData);
    profileModal.show();
  }

  logout() {
    this.authenticationService.logout().subscribe((res) => {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  editProfileInfo(updateData: any) {
    this.userManagementService.editAgent(updateData, this.profileData.userId).subscribe((res: UserSuccessResponse) => {
      console.log(res);
      this.profileData = res.user;
      this.userData.user = res.user;
    }, (err) => {
      // todo : for display error purposes in future
      // this.storeService.showErrorAlert.next(errors.editProfile);
    });
  }

}
