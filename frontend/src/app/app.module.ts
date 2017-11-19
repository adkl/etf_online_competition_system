import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { login } from 'app/login/login.component';
import { Dashboard } from 'app/dashboard/dashboard.component';
//import { AppRoutingModule } from 'app/app-routing.module';
import { LoginService } from 'app/services/login.service';
import { DashboardService } from 'app/services/dashboard.service';

@NgModule({
  declarations: [
    AppComponent, 
    login, 
    Dashboard
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LoginService, 
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
