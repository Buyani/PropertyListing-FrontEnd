import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import Validation from 'src/app/helpers/validators.helper';
import { RegisterDto } from 'src/app/models/registerDto';
import { UserManager } from 'src/app/services/account.service';

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
  user: RegisterDto;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserManager,
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
            Validators.pattern("[a-zA-Z ]*"),
            Validation.cannotContainSpace
          ],
        ],
        surname: [
          '',[
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
      const newaccount = { ...this.user, ...this.registerForm.value };
      //show loader while posting to api
      this.loaderHelper.showLoader();
      this.loading = true;

      //call register service to save new user
      //call register service to save new user
      this.userService.registerUser(newaccount).subscribe({
        next:response=>{
          console.log(response);
          this.continue();
        },
        error:err=>{
          this.errorMessage=err.error.errors;
          this.loading=false;
        }
      })
    }
  }

  continue(): void {
    this.router.navigate(['/login']);
  }
}
