import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from 'app/login/login.component';
import { Dashboard } from 'app/dashboard/dashboard.component';
import { UserComponent} from 'app/user-profile/user.component'

const appRoutes : Routes = [
    {path: 'login', component: Login},
    {path: 'dashboard', component: Dashboard},
    {path: 'profile', component: UserComponent},
    {path: '', component: Dashboard}
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
export class AppRoutingModule {}

