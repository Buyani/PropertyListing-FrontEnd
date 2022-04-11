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
import { AdvertdetailComponent } from './properties/advertdetail/advertdetail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SellerComponent } from './properties/seller/seller.component';
import { ProfileComponent } from './account/profile/profile.component';
import { SellerprofileComponent } from './account/sellerprofile/sellerprofile.component';
import { SearchComponent } from './shared/search/search.component';
import { FeaturedHomesComponent } from './properties/featured-homes/featured-homes.component';


import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { TypePipe } from './pipes/type.pipe';
import { UserManagementComponent } from './properties/user-management/user-management.component';
import { AccountStatusDisplayPipe } from './pipes/account-status.pipe';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserData } from './data/user.data';


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
    TypePipe,
    AccountStatusDisplayPipe,
    ConfirmationdialogComponent,
    AdvertdetailComponent,
    SellerComponent,
    ProfileComponent,
    SellerprofileComponent,
    SearchComponent,
    FeaturedHomesComponent,
    UserManagementComponent
    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(UserData,{ put204: false }),
    NgbModule,
    CarouselModule,
    ButtonModule,
    ToastModule
  ],
  exports: [],
  providers: [
    ConfirmationDialogHelper
  ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationdialogComponent ],
})
export class AppModule { }
