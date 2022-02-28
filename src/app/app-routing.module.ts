import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './properties/home/home.component';
import { HomesListPageComponent } from './properties/homeslistpage/homeslistpage.component';
import { ListPropertyPageComponent } from './properties/listpropertypage/listpropertypage.component';

const routes: Routes = [
  {path:'/', component:HomeComponent },
  { path:'/properties' ,component: HomesListPageComponent},
  //add a guard here to check if user logged in 
  {path :'/listproperty',component: ListPropertyPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
