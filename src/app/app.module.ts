import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomesListPageComponent } from './properties/homeslistpage/homeslistpage.component';
import { ListPropertyPageComponent } from './properties/listpropertypage/listpropertypage.component';
import { HomeComponent } from './properties/home/home.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserData } from './data/user.data';
import { ReactiveFormsModule } from '@angular/forms';
import { UserManager } from './services/account.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    HomesListPageComponent,
    ListPropertyPageComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(UserData)
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
