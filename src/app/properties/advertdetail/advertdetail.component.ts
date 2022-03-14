import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import { Advert } from 'src/app/models/advert.model';
import { AdvertService } from 'src/app/services/advert.service';

@Component({
  selector: 'app-advertdetail',
  templateUrl: './advertdetail.component.html',
  styleUrls: ['./advertdetail.component.css']
})
export class AdvertdetailComponent implements OnInit {

  advert: Advert;

  constructor(private router: ActivatedRoute,
    private advertService: AdvertService,
    private loaderHeper: LoaderHelper,
    private notificationHelper: NotificationHelper) { }

  ngOnInit(): void {
    Promise.resolve().then(() => this.loaderHeper.showLoader());
    this.router.params.subscribe((params) => {
      const advertId = Number(params['advertId']);
      this.getAdvert(advertId);
    })
  }
  //gets advert using advertId
  getAdvert(advertId: number):void{
    if (advertId > 0) {
      this.advertService.getAdvertById(advertId).subscribe({
        next: adv => {
          this.advert = adv;
          this.display(this.advert)
        },
        error: err => this.notificationHelper.setErrorMessage(err)
      })
    }
  }

  //display Advert
  display(ad:Advert){
    console.log(JSON.stringify(ad))
  }

}
