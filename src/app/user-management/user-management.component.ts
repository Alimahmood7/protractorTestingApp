import { UserManagementService } from '../core/services/user-management-service';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { User, ModalData, UserSuccessResponse } from '../core/interfaces/user.interface';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StoreService } from '../core/services/store.service';
import { errors } from '../core/error.messages';
import { PageChangedEvent } from '../../../node_modules/ngx-bootstrap/pagination';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  public modalRef: BsModalRef;
  editModal: boolean;

  constructor(private modalService: BsModalService, private spinnerService: Ng4LoadingSpinnerService,
    private userManagementService: UserManagementService, private storeService: StoreService) {
    this.editModal = false;
  }

  users: User[] = [];
  currentPageUsers: User[] = [];
  addagentData: ModalData;
  editAgentData: ModalData;
  editAgent: any;
  userId: string;
  index: number;
  totalUsers: number;
  pageLimit = 10;
  currentPage: number;

  ngOnInit() {
    this.getAgents();
    this.addagentData = {
      header: 'Add NEW AGENT',
      block: false,
      passwordValidationRequired: true,
      user: {
        firstName: '',
        email: '',
        phone: null,
        username: ''
      }
    };
    this.editAgentData = {
      header: 'Edit AGENT INFORMATION',
      block: true,
      user: {
        firstName: '',
        email: '',
        phone: null,
        username: ''
      }
    };
  }

  pageChanged(event: PageChangedEvent) {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.currentPage = event.page - 1;
    const endItem = event.page * event.itemsPerPage;
    this.currentPageUsers = this.users.slice(startItem, endItem);
  }

  getAgents() {
    this.spinnerService.show();
    this.userManagementService.getAgents().subscribe((data: User[]) => {
      this.users = data;
      this.totalUsers = this.users.length;
      this.currentPage = 0;
      this.currentPageUsers = this.users.slice(0, this.pageLimit);
      this.spinnerService.hide();
    });
  }

  openAddAgentModal(addAgentModal: any) {
    this.addagentData = {
      header: 'ADD AGENT AGENT',
      block: false,
      user: {
        firstName: '',
        email: '',
        phone: null,
        username: ''
      }
    };

    addAgentModal.show();
  }

  openEditAgentModal(editAgentModal: any, user: User, index: any) {
    this.editAgentData = {
      header: 'EDIT AGENT INFORMATION',
      block: true,
      user: {
        firstName: user.firstName,
        email: user.email,
        phone: user.phone,
        username: user.username,
        isBlocked: user.isBlocked,
        type: user.type
      }
    };

    this.userId = user.userId;
    this.index = (this.currentPage * this.pageLimit) + index;
    this.editModal = true;
    editAgentModal.show();

  }

  addAgentInfo(data: any) {
    this.spinnerService.show();
    this.userManagementService.addAgents(data).subscribe((res: UserSuccessResponse) => {
      this.users.unshift(res.user);
      this.currentPageUsers = this.users.slice(this.currentPage * this.pageLimit, (this.currentPage + 1) * this.pageLimit);
      this.spinnerService.hide();
    }, (err) => {
      this.spinnerService.hide();
      // todo : for display error purposes in future
      // this.storeService.showErrorAlert.next(errors.addAgent);
    });
  }

  editAgentInfo(updateData: any) {
    this.spinnerService.show();
    updateData.phone = updateData.phone.split(' ').join('').split('_').join('');
    this.userManagementService.editAgent(updateData, this.userId).subscribe((res: UserSuccessResponse) => {
      this.users[this.index] = res.user;
      this.currentPageUsers = this.users.slice(this.currentPage * this.pageLimit, (this.currentPage + 1) * this.pageLimit);
      this.spinnerService.hide();
    }, (error) => {
      this.spinnerService.hide();
      // todo : for display error purposes in future
      // this.storeService.showErrorAlert.next(errors.editInfo);
    });
  }

  getTotalPages(): number {
    return Math.ceil(this.totalUsers / this.pageLimit);
  }

  updateUserStatus(updateData: boolean) {
    this.spinnerService.show();
    this.userManagementService.blockUser(updateData, this.userId).subscribe((res: UserSuccessResponse) => {
      this.users[this.index] = res.user;
      this.currentPageUsers = this.users.slice(this.currentPage * this.pageLimit, (this.currentPage + 1) * this.pageLimit);
      this.spinnerService.hide();
    }, (error) => {
      this.spinnerService.hide();
      // todo : for display error purposes in future
      // this.storeService.showErrorAlert.next(errors.editInfo);
    });
  }

}
