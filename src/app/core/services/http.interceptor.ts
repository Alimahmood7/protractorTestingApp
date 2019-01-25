import { basePath, systemConfig, endPoints } from './../config';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';

@Injectable()
export class GmcHttpInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newRequest: any;
        newRequest = this.addHeaders(req);
        return next.handle(newRequest).catch((error) => {
            if (error instanceof HttpErrorResponse) {
                if (req.url.includes(endPoints.accessToken) || req.url.includes(endPoints.logout)) {
                    return Observable.throw(error);
                }
                switch ((<HttpErrorResponse>error).status) {
                    case 0:
                    case 401:
                    case 403:
                        return this.handelExpiredTokenError(req, next);
                }
            }
            return Observable.throw(error);
        });
    }

    private addHeaders(req) {
        if (req.url.startsWith(basePath.loginPath)) {
            return req.clone({
                headers: req.headers
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('x-client-id', 'e3a92856d0b4fee31b96e8783ab52007')
                    .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken')),
                withCredentials: true
            });
        } else {
            return req.clone({
                headers: req.headers
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
            });
        }
    }

    private handelExpiredTokenError(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken()
            .switchMap((tokenRefreshed: boolean) => {
                if (tokenRefreshed) {
                    return next.handle(this.addHeaders(req));
                } else {
                    return this.authService.logout();
                }
            }).catch((error) => {
                if (error.url && (error.url.includes(endPoints.accessToken) || error.url.includes(endPoints.logout))) {
                    return this.authService.logout();
                }
                return Observable.throw(error);
            });
    }
}
