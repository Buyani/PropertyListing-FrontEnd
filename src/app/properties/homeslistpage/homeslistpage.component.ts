import { Component, OnInit } from '@angular/core';
import { LogIn } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';

@Component({
  selector: 'app-homeslistpage',
  templateUrl: './homeslistpage.component.html',
  styleUrls: ['./homeslistpage.component.css']
})
export class HomesListPageComponent implements OnInit {

  currentUser:User;

  constructor(private userService:UserManager) { 
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    console.log("USER",this.currentUser);
  }

}
