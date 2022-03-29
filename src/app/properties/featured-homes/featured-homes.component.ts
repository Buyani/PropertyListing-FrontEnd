import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { Advert } from 'src/app/models/advert.model';
import { Router } from '@angular/router';
import { AdvertService } from 'src/app/services/advert.service';
import { AdvertType } from 'src/app/models/advert-type.model';

@Component({
  selector: 'app-featured-homes',
  templateUrl: './featured-homes.component.html',
  styleUrls: ['./featured-homes.component.css']
})
export class FeaturedHomesComponent implements OnInit {
  adverts: Advert[];

  responsiveOptions;

  constructor(
    private advertService: AdvertService,
    private route: Router,
    private loaderHelper: LoaderHelper) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    Promise.resolve().then(() => this.loaderHelper.showLoader());
    this.advertService.getAdverts().subscribe({
      next: ads => {
        this.adverts = ads.sort((low, high) => high.id - low.id).filter(adv=> adv.advertType===AdvertType.FEATURED);
        console.log(this.adverts);
      }
    })
  }
// featured advert click
  onAdvertDetails(advert:Advert):void{
    this.route.navigate(['/details', advert.id]);
  }
}
