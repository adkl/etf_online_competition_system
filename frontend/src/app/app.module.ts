import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainNavComponent } from 'app/main-nav/main-nav.component';
import { LoginComponent } from 'app/login/login.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { TakeTestComponent } from 'app/take-test/take-test.component';
import { SubmittedTestComponent } from 'app/submitted-test/submitted-test.component';
import { UserComponent } from 'app/user-profile/user.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { DashboardService } from 'app/services/dashboard.service';
import { UserService } from 'app/user-profile/user.service';
import { Config } from 'app/config/config';
import { AuthService } from 'app/auth/auth.service';
import { AuthModule } from 'app/auth/auth.module';
import { GlobalEventsManager } from 'app/config/global-events-manager';
import { AuthGuard, AuthGuardDeactivate } from 'app/auth/auth.guard';
import { SpinnerModule } from 'angular2-spinner/dist';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    TakeTestComponent,
    SubmittedTestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    AppRoutingModule,
    SpinnerModule
  ],
  providers: [
    Config,
    GlobalEventsManager,
    DashboardService,
    UserService,
    AuthGuard,
    AuthGuardDeactivate,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
