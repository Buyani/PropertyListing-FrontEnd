import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';

@Component({
  selector: 'app-sellerprofile',
  templateUrl: './sellerprofile.component.html',
  styleUrls: ['./sellerprofile.component.css']
})
export class SellerprofileComponent implements OnInit {

  currentUser: User;
  sellerForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string;
  loading: boolean = false;
  seller:User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserManager,
    private loaderHelper:LoaderHelper,
    private notificationHelper:NotificationHelper) {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.createForm();
    this.setSellerProfile();
  }

  //create profile form
  createForm() {
    this.sellerForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(6),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
          ],
        ],
        cellphone:['',[Validators.minLength(6),Validators.maxLength(30),]],
      });
  }
  //set fomr values on load
  setSellerProfile() {
    this.sellerForm.patchValue({
      email: this.currentUser.email,
      cellphone:this.currentUser.cellphone
    });
  }

  //easly access form controls
  get f() {
    return this.sellerForm.controls;
  }

  //on submit
  onSubmit() {
    this.submitted = true;
    //if the form is valid
    if (this.sellerForm.invalid) {
      this.sellerForm.markAllAsTouched();
      this.notificationHelper.setErrorMessage("Error occured while trying to update profile");
      return;
    }
    else {
      //map form values to object values
      const p = { ...this.seller, ...this.sellerForm.value };
      p.id=this.currentUser.id;
      p.role=this.currentUser.role;
      p.forename=this.currentUser.forename;
      p.surname=this.currentUser.surname;
      p.role=this.currentUser.role;
      p.password=this.currentUser.password;
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
