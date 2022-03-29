import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
import { ConfirmationDialogHelper } from 'src/app/helpers/confirmation.helper';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import { Status } from 'src/app/models/advert-status.model';
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

  pageTitle: string = "Your Adverts";
  myAdverts: Advert[];
  currentUser: User;
  errorMessage: string;
  updatingStatus: boolean;
  deleting: boolean;

  constructor(private loaderHelper: LoaderHelper,
    private advertService: AdvertService,
    private router: Router,
    private ConfirmationHelper: ConfirmationDialogHelper,
    private notificationHelper: NotificationHelper,
    private userService: UserManager) {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    Promise.resolve().then(() => this.loaderHelper.showLoader());
    //if user is logged get users adverts
    if (this.currentUser) {

      this.advertService.getUserAdverts(Number(this.currentUser.id)).subscribe({
        next: adverts =>{
          this.myAdverts = adverts
        },
        error: err => this.notificationHelper.setErrorMessage(err)
      })

     
    }
  }

  //on hide advert
  onHideOrShowAdvert(advert: Advert, status: Status) {
    this.updatingStatus = true;
    this.loaderHelper.showLoader();

    if (advert) {
      advert.status = status;
      this.advertService.updateAdvert(advert).subscribe({
        next:adv=>{
          this.updatingStatus = false;
          this.deleting = false;
          this.loaderHelper.hideLoader();
        },
        error:err=>this.notificationHelper.setErrorMessage(err)
      })
    }
  }
  //when delete option is selected
  onDelete(advert: Advert): void {
    this.ConfirmationHelper.confirm('Please confirm..', `Do you really want to delete :${advert.headlineText} ... ?`)
      .then((confirmed) => {
        if (confirmed) {
          this.deleting = true;
          this.loaderHelper.showLoader();

          this.advertService.deleteAdvert(advert.id).subscribe({
            next: () =>{
              this.myAdverts = this.myAdverts.filter(adv => adv != advert);
              this.updatingStatus = false;
              this.deleting = false;
              this.loaderHelper.hideLoader();
            },
            error: err => this.notificationHelper.setErrorMessage(err)
          })
        }
        else {
          console.log('User canceled...')
          return;
        }
      })
      .catch(() => console.log('User dismissed the dialog)'));
  }

  //when edit button is clicked ,pass id and navigate
  onAdvertEdit(advertid: number) {
    this.router.navigate(['/adverts', advertid])
  }
}
