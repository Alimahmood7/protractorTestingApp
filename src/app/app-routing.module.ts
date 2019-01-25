import { SearchResultsComponent } from './dashboard/search-results/search-results.component';
import { OrganizationsComponent } from './organizations/organizations/organizations.component';
import { LoginGuard } from './core/guards/login.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '404', component: PageNotFoundComponent },
  { path: 'userManagement', component: UserManagementComponent, canActivate: [AdminGuard] },
  { path: 'organizations', component: OrganizationsComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
