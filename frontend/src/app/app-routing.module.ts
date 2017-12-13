import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'app/login/login.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { TakeTestComponent } from 'app/take-test/take-test.component';
import { UserComponent } from 'app/user-profile/user.component';
import { AuthGuard, AuthGuardDeactivate } from 'app/auth/auth.guard';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardDeactivate] },
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: UserComponent },
      { path: 'take-test/:id', component: TakeTestComponent }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

