import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import { AccountStatus } from 'src/app/models/account-status.model';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  @ViewChild('closebutton') closebutton:ElementRef;

  usersList: User[];
  filtredUsers: User[];
  updating: boolean = false;
  submitted: boolean;
  emailUpdateForm: FormGroup;
  userToUpdate: User;

  constructor(
    private loaderHelper: LoaderHelper,
    private notificatioHelper: NotificationHelper,
    private userManager: UserManager,
    private fb: FormBuilder
  ) { }

  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filtredUsers = this.filterUsersBySurName(value);
  }

  ngOnInit(): void {
    Promise.resolve().then(() => this.loaderHelper.showLoader());
    this.createForm();
    this.userManager.getUsers().subscribe({
      next: data => {
        this.usersList = data;
        this.filtredUsers = this.usersList;
        this.loaderHelper.hideLoader();
      }
    })
  }
  //on lock/unlock user
  onLockOrOnLock(user: User, status: AccountStatus) {
    this.updating = true;
    this.loaderHelper.showLoader();

    if (user) {
      user.locked = status;
      this.userManager.updateUser(user).subscribe({
        next: adv => {
          this.updating = false;
          this.loaderHelper.hideLoader();
      
        },
        error: err => this.notificatioHelper.setErrorMessage(err)
      })
    }
  }

  //filter users using surname
  filterUsersBySurName(value: string): User[] {
    return this.usersList.filter((user: User) => user.surname.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  //on emailEdit
  onUpdateMail(user: User) {
    this.userToUpdate = user;
    this.emailUpdateForm.setValue({
      email:user.email
    })
  }

  //on change user email
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.emailUpdateForm.invalid) {
      this.emailUpdateForm.markAllAsTouched();
      return;
    }
    else {
      if( this.userToUpdate.email===this.f['email'].value)
      {
        return;
      }
      this.userToUpdate.email = this.f['email'].value;
      this.userManager.updateUser(this.userToUpdate).subscribe({
        next: user => {
          this.updating = false;
          this.loaderHelper.hideLoader();
          this.close();
        },
        error: err => this.notificatioHelper.setErrorMessage(err)
      })
    }
  }
  //close the modal pop up
  close(){
    this.closebutton.nativeElement.click();
    this.emailUpdateForm.reset();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.emailUpdateForm.controls;
  }
  createForm() {
    this.emailUpdateForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(6),
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ],
      ],
    })
  }

}
