import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { RoleGuard } from './helpers/role.guard';
import { AdminComponent } from './properties/admin/admin.component';
import { AdvertdetailComponent } from './properties/advertdetail/advertdetail.component';
import { AdverteditComponent } from './properties/advertedit/advertedit.component';
import { HomeComponent } from './properties/home/home.component';
import { HomesListPageComponent } from './properties/homeslistpage/homeslistpage.component';
import { ListPropertyPageComponent } from './properties/listpropertypage/listpropertypage.component';
import { MyadvertsComponent } from './properties/myadverts/myadverts.component';

const routes: Routes = [
  {path:'', component:HomeComponent },
  {path:'home', component:HomeComponent },
  { path:'properties' ,component: HomesListPageComponent},
  //add a guard here to check if user logged in 
  {path :'listproperty',component: ListPropertyPageComponent ,canActivate: [AuthGuard]},
  {path :'register',component: RegisterComponent},
  {path :'login',component: LoginComponent},
  { path:'myadverts', component: MyadvertsComponent,canActivate: [AuthGuard]},
  { path:'admin' ,component: AdminComponent , canActivate: [AuthGuard , RoleGuard]},
  { path :'adverts/:id', component:AdverteditComponent,canActivate:[AuthGuard]},
  { path :'details/:advert', component:AdvertdetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
