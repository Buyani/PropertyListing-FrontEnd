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
  filteredUsers:User[];

  constructor(private loaderHelper:LoaderHelper,
    private userManager:UserManager,
    private notificationHelper:NotificationHelper) { }

  ngOnInit(): void {
    Promise.resolve().then(()=>this.loaderHelper.showLoader());
    this.getUsers();
  }

  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredUsers = this.filteruserBySurname(value);
  }

  //sesrch user by surname
  filteruserBySurname(surname:string){
    return this.users.filter((user)=> user.surname.toLowerCase().indexOf(surname.toLowerCase())!==-1)
  }
  //get a lsit of users
  getUsers():void{
    this.userManager.getUsers().subscribe({
      next:data=>{
        this.users=data;
        this.filteredUsers=this.users;
        this.loaderHelper.hideLoader();
      },
      error:err=>{
        this.notificationHelper.setErrorMessage(err)
      }
    })
  }

}
