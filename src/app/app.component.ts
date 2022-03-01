import { Component } from '@angular/core';
import { User } from './models/user.model';
import { UserManager } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PropertyListing-FrontEnd';
  currentUser: User;

  constructor(
    private usernamanger: UserManager
) {
    this.usernamanger.currentUser.subscribe(x => this.currentUser = x);
}
}
