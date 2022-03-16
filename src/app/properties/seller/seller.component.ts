import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/helpers/validators.helper';
import { Advert } from 'src/app/models/advert.model';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  @Input() advert:Advert;
  seller:User;
  messageForm:FormGroup;
  errorMessage:string;

  constructor(private userManager:UserManager,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createMessageForm();
    this.userManager.getUsers().subscribe({
      next:users=>{
        this.seller=users.find(u=>u.id===this.advert.user_id);
      }
    })
  }

  //easly access
  get f(){
    return this.messageForm.controls
  }

  onMessageSend()
  {
    if(this.messageForm.invalid){
      this.messageForm.markAllAsTouched();
      this.errorMessage = 'Error occured make sure all fields are correct';
    }
    else{
      console.log(JSON.stringify(this.messageForm))
    }
    
  }
  createMessageForm():void{

    this.messageForm=this.formBuilder.group({
      name:['',
      [ Validators.required,
        Validators.maxLength(100),
        Validators.minLength(5),
        Validators.pattern("[a-zA-Z ]*"),
        Validation.cannotContainSpace]
      ],
      email:['',
      [Validators.required,
        Validators.maxLength(100),
        Validators.minLength(6),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      cellnumber:['',[Validators.required,Validators.minLength(0),Validators.maxLength(100)]],
      message:[`I'm interested in this property, please contact me.`,[ Validators.required,
        Validators.maxLength(100),
        Validators.minLength(10),
        Validators.pattern("[a-zA-Z ]*"),
        Validation.cannotContainSpace]]
    })
  }
}

