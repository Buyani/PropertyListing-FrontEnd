import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import Validation from 'src/app/helpers/validators.helper';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';

@Component({
  selector: 'app-accountprofile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  profileForm: FormGroup;
  currentPassword: string;
  submitted: boolean = false;
  errorMessage: string;
  loading: boolean = false;
  profile:User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserManager,
    private loaderHelper:LoaderHelper,
    private notificationHelper:NotificationHelper) {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.createForm();
    this.setProfile();
  }

  //create profile form
  createForm() {
    this.profileForm = this.formBuilder.group(
      {
        forename: [
          '',
          [
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(1),
            Validators.pattern("[a-zA-Z ]*"),
            Validation.cannotContainSpace
          ],
        ],
        surname: [
          '', [
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(3),
            Validators.pattern("[a-zA-Z ]*"),
            Validation.cannotContainSpace
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(6),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
          ],
        ],
        currentpassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
            Validators.pattern("^[a-zA-Z0-9 ]+$"),
            Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
            Validation.cannotContainSpace,

          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
            Validators.pattern("^[a-zA-Z0-9 ]+$"),
            Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
            Validation.cannotContainSpace,

          ],
        ],
        oldpassword: [''],
        cellphone:['',[Validators.minLength(6),Validators.maxLength(30),]],
        confirmpassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
            Validators.pattern("^[a-zA-Z0-9 ]+$"),
            Validation.cannotContainSpace,
          ],
        ],
      },
      {
        validator: Validators.compose([
          Validation.match('password', 'confirmpassword'),
          Validation.currentNotMatch('oldpassword', 'currentpassword'),
          Validation.OldandNew('password', 'oldpassword')
        ])
      }
    );
  }
  //set fomr values on load
  setProfile() {
    this.profileForm.patchValue({
      forename: this.currentUser.forename,
      surname: this.currentUser.surname,
      email: this.currentUser.email,
      oldpassword: this.currentUser.password,
      cellphone:this.currentUser.cellphone
    });
    this.currentPassword = this.currentUser.password;
  }

  //easly access form controls
  get f() {
    return this.profileForm.controls;
  }

  //on submit
  onSubmit() {
    this.submitted = true;
    //if the form is valid
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.notificationHelper.setErrorMessage("Error occured while trying to update profile");
      return;
    }
    else {
      //map form values to object values
      const p = { ...this.profile, ...this.profileForm.value };
      p.id=this.currentUser.id;
      p.role=this.currentUser.role;
      //show loader while posting to api
     this.loaderHelper.showLoader();
      this.loading = true;

      //call user Service and update user profile
      this.userService.updateUser(p).subscribe({
        next:user=>{
          this.loaderHelper.hideLoader()
          this.loading=false;
          this.submitted=false;
        },
        error:err=>this.errorMessage=err
      }) 
    }
  }



}
