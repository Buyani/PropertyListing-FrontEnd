import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  user:User;
  errorMessage:string='';

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserManager) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        forename: ['', Validators.required],
          surname: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      const s={ ...this.user, ...this.registerForm.value};
      this.userService.register(s).subscribe({
        next:()=> console.log('Done......'),
        error:err=>this.errorMessage=err
      })
      
      this.userService.getUsers().subscribe({
        next:(data)=> console.log(data)
      })
  }
}
