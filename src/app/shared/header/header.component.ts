import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser:User;
  loggedIn:boolean=false;

  constructor(private userService:UserManager,private router:Router) { }

  ngOnInit(): void {
    let user=""+localStorage.getItem('currentUser');
    if(user)
    {
      this.currentUser=JSON.parse(user);
      console.log("WELCOME ",this.currentUser.forename);
    }

  }

  loggedin(){
    if(this.currentUser)
    {
      this.loggedIn=true;
    }
  }
  logout(){
    this.userService.clearuser('currentUser');
    this.loggedIn=false;
    this.router.navigate(['/']);
  }

}
