import { Component, OnInit } from '@angular/core';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users:User[];

  constructor(private loaderHelper:LoaderHelper,
    private userManager:UserManager,
    private notificationHelper:NotificationHelper) { }

  ngOnInit(): void {
    Promise.resolve().then(()=>this.loaderHelper.showLoader());
    this.getUsers();
  }


  //get a lsit of users
  getUsers():void{
    this.userManager.getUsers().subscribe({
      next:data=>{
        this.users=data;
        this.loaderHelper.hideLoader();
      },
      error:err=>{
        this.notificationHelper.setErrorMessage(err)
      }
    })
  }

}
