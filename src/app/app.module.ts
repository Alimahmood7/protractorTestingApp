import { OrganizationsComponent } from './organizations/organizations/organizations.component';
import { DateFormatPipe } from './core/pipes/DateTime.pipe';
import { UserManagementService } from './core/services/user-management-service';
import { SimDetailService } from './core/services/sim-detail.service';
import { StoreService } from './core/services/store.service';
import { AdminGuard } from './core/guards//admin.guard';
import { GmcHttpInterceptor } from './core/services/http.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { LoginComponent } from './login/login/login.component';
import { SearchResultsComponent } from './dashboard/search-results/search-results.component';
import { DashboardService } from './core/services/dashboard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './dashboard/events/events.component';
import { SummeryComponent } from './dashboard/summery/summery.component';
import { MomentModule } from 'angular2-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchService } from './core/services/search.service';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthenticationService } from './core/services/authentication.service';
import { UserManagementComponent } from './user-management/user-management.component';
import { LoginGuard } from './core/guards/login.guard';
import { AngularDraggableModule } from 'angular2-draggable';
import { SimDetailComponent } from './dashboard/sim-detail/sim-detail.component';
import { TabsModule } from 'ngx-bootstrap';
import { SendMessageComponent } from './dashboard/sim-detail/send-message/send-message.component';
import { EventsLogComponent } from './dashboard/events/events-log/events-log.component';
import { SimInformationComponent } from './dashboard/sim-detail/sim-information/sim-information.component';
import { NouisliderModule } from 'ng2-nouislider';
import { UserProfileModalComponent } from './user-management/user-profile-modal/user-profile-modal.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TarrifProfileComponent } from './dashboard/sim-detail/tarrif-profile/tarrif-profile.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ExportDetailComponent } from './dashboard/sim-detail/export-detail/export-detail.component';
import { AlertModelComponent } from './alert-model/alert-model/alert-model.component';
import { TextMaskModule } from 'angular2-text-mask';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DateFormatPipe,
    LoginComponent,
    SearchResultsComponent,
    DashboardComponent,
    EventsComponent,
    SummeryComponent,
    PageNotFoundComponent,
    UserManagementComponent,
    SimDetailComponent,
    SimInformationComponent,
    SendMessageComponent,
    EventsLogComponent,
    UserProfileModalComponent,
    TarrifProfileComponent,
    ExportDetailComponent,
    AlertModelComponent,
    OrganizationsComponent
  ],
  imports: [
    AngularDraggableModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NouisliderModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    AppRoutingModule,
    TextMaskModule,
    PaginationModule.forRoot()
  ],
  providers: [
    DashboardService,
    SearchService,
    AuthGuard,
    SimDetailService,
    AdminGuard,
    LoginGuard,
    AuthenticationService,
    UserManagementService,
    StoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GmcHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
