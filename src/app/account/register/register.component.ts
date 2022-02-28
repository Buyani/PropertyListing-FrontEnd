import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    PageTitle:string="Register Page";
  
    registerForm:FormGroup;
    isSuccessFull:boolean;
    signupFailed:boolean;
    isSumited:boolean;
    errorMessage:"";
  
    constructor(private fb:FormBuilder) { }
  
    ngOnInit(): void {
      this.createRegistrationForm();
    }
    //getter to easly access form fileds
    get f(){
      return this.registerForm.controls;
    }
    //create rigister form
    createRegistrationForm():void{
      this.registerForm=this.fb.group({
        foreNames:["",[Validators.required,Validators.min(1),Validators.max(100)]],
        surname:["",[Validators.required,Validators.min(3),Validators.max(100)]],
        email:["",[Validators.required,Validators.min(6),Validators.max(100)]],
        password:["",[Validators.required,Validators.min(6),Validators.max(100)]],
        passwordConfirm:["",[Validators.required]]
      })
    }
    //on submit button click
    onSubmit(){
      this.isSumited=true;
      if(this.registerForm.invalid)
      {
        return;
      }
      console.log(JSON.stringify(this.registerForm.value));
  
    }

}
