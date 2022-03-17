import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    this.profileForm=this.formBuilder.group({
      forename:[''],
      surname:[''],
      email:[''],
      cellphone:['']
    })
  }
  //set fomr values on load
  setProfile(){
    this.profileForm.patchValue({
      forename:this.currentUser.forename,
      surname:this.currentUser.surname,
      email:this.currentUser.email,
      cellphone:this.currentUser.cellphone
    })
  }

  //on submit
  onSubmit(){
    
  }

}
