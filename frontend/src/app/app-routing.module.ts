import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { login } from 'app/login/login.component';
import { Dashboard } from 'app/dashboard/dashboard.component';

const appRoutes : Routes = [
    {path: 'login', component: login},
    {path: 'dashboard', component: Dashboard}
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