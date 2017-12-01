import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Login } from 'app/login/login.component';
import { Dashboard } from 'app/dashboard/dashboard.component';
import { UserComponent} from 'app/user-profile/user.component'
import { AppRoutingModule } from 'app/app-routing.module';
import { LoginService } from 'app/services/login.service';
import { DashboardService } from 'app/services/dashboard.service';
import { UserService} from 'app/user-profile/user.service'

@NgModule({
  declarations: [
    AppComponent, 
    Login, 
    Dashboard,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    LoginService, 
    DashboardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
