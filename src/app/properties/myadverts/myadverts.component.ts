import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import { Advert } from 'src/app/models/advert.model';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';
import { AdvertService } from 'src/app/services/advert.service';

@Component({
  selector: 'app-myadverts',
  templateUrl: './myadverts.component.html',
  styleUrls: ['./myadverts.component.css']
})
export class MyadvertsComponent implements OnInit {

  pageTitle:string="Your Adverts";
  myAdverts:Advert[];
  currentUser:User;
  errorMessage:string;

  constructor(private loaderHelper:LoaderHelper, 
    private advertService:AdvertService,
    private router:Router,
    private notificationHelper:NotificationHelper,
    private userService:UserManager) { 
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    Promise.resolve().then(()=>this.loaderHelper.showLoader());
    //if user is logged get users adverts
    if(this.currentUser){
      
      this.advertService.getUserAdverts(Number(this.currentUser.id)).subscribe({
        next:adverts=>this.myAdverts=adverts,
        error:err=>this.notificationHelper.setErrorMessage(err)
      })
    }
  }

  //when edit button is clicked ,pass id and navigate
  onAdvertEdit(advertid:number){
    this.router.navigate(['/adverts',advertid])
  }
}
