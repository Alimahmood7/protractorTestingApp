import { DateFormatPipe } from './core/pipes/DateTime.pipe';
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
import { DashboardService } from './core/services/dashboard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthenticationService } from './core/services/authentication.service';
import { LoginGuard } from './core/guards/login.guard';
import { TabsModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DateFormatPipe,
        LoginComponent,
        DashboardComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        AppRoutingModule,
        PaginationModule.forRoot()
    ],
    providers: [
        DashboardService,
        AuthGuard,
        AdminGuard,
        LoginGuard,
        AuthenticationService,
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
