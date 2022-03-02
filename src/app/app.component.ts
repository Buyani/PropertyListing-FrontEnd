
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { UserManager } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PropertyListing-FrontEnd';
  currentUser: User;

  constructor(private userService:UserManager,private router:Router){
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
  ngOnInit(): void {
    let user=""+localStorage.getItem('currentUser');
    if(user)
    {
      this.currentUser=JSON.parse(user);
    }
  }

  logout(){
    this.userService.clearuser('currentUser');
    this.router.navigate(['/']);
  }

}
