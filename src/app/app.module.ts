import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomesListPageComponent } from './properties/homeslistpage/homeslistpage.component';
import { ListPropertyPageComponent } from './properties/listpropertypage/listpropertypage.component';
import { HomeComponent } from './properties/home/home.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserData } from './data/user.data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyadvertsComponent } from './properties/myadverts/myadverts.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AdminComponent } from './properties/admin/admin.component';
import { AdverteditComponent } from './properties/advertedit/advertedit.component';
import { StatusPipe } from './pipes/status.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationdialogComponent } from './shared/confirmationdialog/confirmationdialog.component';
import { ConfirmationDialogHelper } from './helpers/confirmation.helper';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HomesListPageComponent,
    ListPropertyPageComponent,
    HomeComponent,
    MyadvertsComponent,
    LoaderComponent,
    AdminComponent,
    AdverteditComponent,
    StatusPipe,
    ConfirmationdialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(UserData),
    NgbModule,
  ],
  exports: [],
  providers: [
    ConfirmationDialogHelper
  ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationdialogComponent ],
})
export class AppModule { }
