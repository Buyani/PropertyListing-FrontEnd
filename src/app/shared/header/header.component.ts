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


  constructor(private userService:UserManager,private router:Router) { }

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
