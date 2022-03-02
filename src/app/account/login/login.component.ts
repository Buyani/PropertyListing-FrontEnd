import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  user:LogIn;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService:UserManager) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['sabeloshezi@gmail.com', Validators.required],
          password: ['SabeloMhlongo@91', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      const s={ ...this.user, ...this.loginForm.value};
      this.userService.login(s.username,s.password);
    }
}
