
import { Component, OnInit } from '@angular/core';
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

  constructor(private userService:UserManager){}
  ngOnInit(): void {
    this.userService.clearuser('currentUser');
  }
}
