import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import { LogIn } from 'src/app/models/login.model';
import { UserManager } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  returnUrl: string;
  user: LogIn;

  constructor(
    private formBuilder: FormBuilder,
    private notitifcationHelper: NotificationHelper,
    private userService: UserManager,
    private loaderHelper: LoaderHelper
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')],
      ],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.notitifcationHelper.setErrorMessage(
        'Please make sure all fields are correct'
      );
      this.submitted = false;
      return;
    }
    //map form values to object values
    const s = { ...this.user, ...this.loginForm.value };
    this.loaderHelper.showLoader();
    this.userService.login(s.username, s.password).subscribe({
      next: value => {
        if (!value)
          this.submitted = false;
      }
    });
  }
}
