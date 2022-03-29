import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { Advert } from 'src/app/models/advert.model';
import { AdvertService } from 'src/app/services/advert.service';

@Component({
  selector: 'app-featured-homes',
  templateUrl: './featured-homes.component.html',
  styleUrls: ['./featured-homes.component.css']
})
export class FeaturedHomesComponent implements OnInit {
  adverts: Advert[];

  responsiveOptions;

  constructor(private advertService: AdvertService,
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
        this.adverts = ads;
      }
    })
  }
}
