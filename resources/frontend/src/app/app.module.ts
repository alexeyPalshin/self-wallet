import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from  './material/material.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { UserService, AuthenticationService } from './services';
import { RegistrationDialogComponent } from './dialogs/registration-dialog/registration-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationDialogComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    AuthenticationService,
    UserService
  ],
  entryComponents: [
    RegistrationDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
