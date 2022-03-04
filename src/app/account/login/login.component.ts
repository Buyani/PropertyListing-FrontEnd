import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { LogIn } from 'src/app/models/login.model';
import { UserManager } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorMessage:string;
  user:LogIn;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService:UserManager,
      private loaderHelper:LoaderHelper) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['buyanimhlongo@gmail.com', Validators.required],
          password: ['BSmhlongo@91', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          this.errorMessage="Error occured make sure all fields are correct"
          return;
      }
      this.loading = false;
      //map form values to object values
      const s={ ...this.user, ...this.loginForm.value};
      this.loaderHelper.showLoader();
      this.userService.login(s.username,s.password);
    }
}
