import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/helpers/validators.helper';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';

@Component({
  selector: 'app-accountprofile',
  templateUrl: './accountprofile.component.html',
  styleUrls: ['./accountprofile.component.css']
})
export class AccountprofileComponent implements OnInit {

  currentUser:User;
  profileForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private userService: UserManager) { 
      this.userService.currentUser.subscribe(user => this.currentUser = user);
    }

  ngOnInit(): void {
    this.createForm();
    this.setProfile();
  }

  //create profile form
  createForm(){
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
  //set fomr values on load
  setProfile(){
    this.profileForm.patchValue({
      forename:this.currentUser.forename,
      surname:this.currentUser.surname,
      email:this.currentUser.email,
      currentpassword:this.currentUser.password
    })
  }

  //on submit
  onSubmit(){

  }

}
