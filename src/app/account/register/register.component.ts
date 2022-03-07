import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import Validation from 'src/app/helpers/validators.helper';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';

function passwordMatcher(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const password = c.get('password');
  const confirmpassword = c.get('confirmpassword');
  if (password.pristine || confirmpassword.pristine) {
    return null;
  }

  if (password.value === confirmpassword.value) {
    return null;
  }

  return { match: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  packageForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserManager,
    private notificationHelper: NotificationHelper,
    private loaderHelper: LoaderHelper
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        forename: [
          '',
          [
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(1),
            Validators.pattern("[a-zA-Z ]*")
          ],
        ],
        surname: [
          '',[
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3),
          Validators.pattern("[a-zA-Z ]*")
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(6),
            Validators.email
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
      { validator: [Validation.match('password','confirmpassword') ]}
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.errorMessage = 'Error occured make sure all fields are correct';
      return;
    } else {
      //map form values to object values
      const s = { ...this.user, ...this.registerForm.value };
      //show loader while posting to api
      this.loaderHelper.showLoader();
      this.loading = true;

      //call register service to save new user
      this.userService.register(s).subscribe({
        next: () => this.continue(),
        error: (err) => (this.errorMessage = err),
      });

      this.userService.getUsers().subscribe({
        next: (data) => console.log(data),
      });
    }
  }

  continue(): void {
    this.loaderHelper.hideLoader();
    this.router.navigate(['/login']);
  }
}
