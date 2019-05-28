import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UpdateComponent } from './pages/update/update.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'update', component: UpdateComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
