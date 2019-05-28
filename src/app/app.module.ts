
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StorageServiceModule} from 'angular-webstorage-service';
import { CommonModule } from '@angular/common';



import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { UpdateComponent } from './pages/update/update.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ErrorComponent } from './pages/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AdminComponent,
    UpdateComponent,
    ErrorComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StorageServiceModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
