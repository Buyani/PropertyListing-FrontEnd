import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  PageTitle: string = 'LogIn  Page';
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createLogInForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  createLogInForm(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  //on button login
  onSubmit(){
    
  }
}
