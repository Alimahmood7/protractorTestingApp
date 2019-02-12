import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalData } from '../../core/interfaces/user.interface';
@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {
  showPassword = false;
  @Input() userInfo: any;
  @Input() userData: ModalData;
  @Output() valueChange = new EventEmitter<any>();
  @Output() blockUser = new EventEmitter<any>();
  userInfoForm: FormGroup;
  public mask: Array<string | RegExp>;

  constructor() {
    this.mask = [ /\d/, /\d/, /\d/,  ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  }

  customValidation(control: FormControl) {
    if (this.userData.header === 'PERSONAL INFORMATION') {
      return control.value !== '';
    }
  }

  ngOnInit() {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      email: new FormControl
        ('', [Validators.compose([Validators.required, Validators.email])]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', this.userData.passwordValidationRequired ? [Validators.required] : []),
      cpassword: new FormControl('', this.userData.passwordValidationRequired ? [Validators.required] : [])
    });
  }

  closeModal(modal?: any) {
    this.userInfo.hide();
    this.userInfoForm.reset();
  }

  get passwordNotMatched() {
    if (this.userInfoForm.value.password !== this.userInfoForm.value.cpassword) {
      return true;
    }
  }
  onSubmit() {
    this.valueChange.emit(this.userInfoForm.value);
    this.closeModal();
  }

  onBlock() {
    const userStatus = this.userData.user.isBlocked === undefined ? true : !this.userData.user.isBlocked;
    this.blockUser.emit(userStatus);
    this.closeModal();
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  getPasswordType() {
    return this.showPassword ? 'text' : 'password';
  }
}
