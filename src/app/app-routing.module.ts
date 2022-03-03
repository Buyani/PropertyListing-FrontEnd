import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './properties/home/home.component';
import { HomesListPageComponent } from './properties/homeslistpage/homeslistpage.component';
import { ListPropertyPageComponent } from './properties/listpropertypage/listpropertypage.component';

const routes: Routes = [
  {path:'home', component:HomeComponent },
  { path:'properties' ,component: HomesListPageComponent},
  //add a guard here to check if user logged in 
  {path :'listproperty',component: ListPropertyPageComponent ,canActivate: [AuthGuard]},
  {path :'register',component: RegisterComponent},
  {path :'login',component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
