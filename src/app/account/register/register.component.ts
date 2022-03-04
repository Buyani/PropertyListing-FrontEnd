import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import Validation from 'src/app/helpers/validators.helper';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';

function MatchPassword(control: AbstractControl) {
  let password = control.get('password').value;
  let confirmPassword = control.get('confirm_password').value;

  if (password != confirmPassword) {
    return { ConfirmPassword: true };
  } else {
      return null
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserManager,
    private notificationHelper: NotificationHelper,
    private loaderHelper: LoaderHelper) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      forename: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(1)]],
      surname: ['', Validators.required, Validators.maxLength(100), Validators.minLength(3)],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(6), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)]]
    },{validator:MatchPassword});
  }

  


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.errorMessage = "Error occured make sure all fields are correct";
      return;
    }
    //map form values to object values 
    const s = { ...this.user, ...this.registerForm.value };
    //show loader while posting to api
    this.loaderHelper.showLoader();
    this.loading = true;

    //call register service to save new user
    this.userService.register(s).subscribe({
      next: () => this.continue(),
      error: err => this.errorMessage = err
    })

    this.userService.getUsers().subscribe({
      next: (data) => console.log(data)
    })
  }

  continue(): void {
    this.loaderHelper.hideLoader();
    this.router.navigate(['/login']);
  }
}
