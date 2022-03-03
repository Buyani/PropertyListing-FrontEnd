
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoaderHelper } from './helpers/loader.helper';
import { NotificationHelper } from './helpers/notifications.helper';
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
  showLoader$ = this.loaderHelper.loadingAction$;
  hideLoader$ = this.loaderHelper.loadingAction$;

  constructor(private userService:UserManager,
    private router:Router,
    private loaderHelper: LoaderHelper,
    private notificationHelper: NotificationHelper){
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  successMessage$ = this.notificationHelper.successMessageAction$.pipe(
    tap((message) => {
      if (message) {
        //if there is a global success message clear it out after 6 seconds
        setTimeout(() => {
          this.notificationHelper.clearAllMessages();
        }, 6000);
      }
    })
  );
  errorMessage$ = this.notificationHelper.errorMessageAction$.pipe(
    tap((message) => {
      //if there is a global error message clear it out after 6 seconds
      if (message) {
      setTimeout(() => {
        this.notificationHelper.clearAllMessages();
      }, 6000);
    }
    })
  );

  ngOnInit(): void {
    let user=""+localStorage.getItem('currentUser');
    if(user)
    {
      this.currentUser=JSON.parse(user);
    }
  }
//logs out the logged in user
  logout(){
    this.userService.clearuser('currentUser');
    this.router.navigate(['/home']);
  }
}

  
