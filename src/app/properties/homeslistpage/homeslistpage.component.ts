import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import { Advert } from 'src/app/models/advert.model';
import { Search } from 'src/app/models/search.mode.';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';
import { AdvertService } from 'src/app/services/advert.service';

@Component({
  selector: 'app-homeslistpage',
  templateUrl: './homeslistpage.component.html',
  styleUrls: ['./homeslistpage.component.css'],
})
export class HomesListPageComponent implements OnInit {
  currentUser: User;
  advertsList: Advert[];
  filteredAdverts: Advert[];
  selectedAdvert: Advert;
  searching:boolean=false;

  searchCriteria:Search;

  page = 1;
  pageSize = 10;
  collectionSize: number;
  currentRate = 8;

  constructor(
    private userService: UserManager,
    private advertService: AdvertService,
    private route: Router,
    private loaderHelper: LoaderHelper,
    private notificatioHelper: NotificationHelper
  ) {
    this.userService.currentUser.subscribe((user) => (this.currentUser = user));
  }
  //component start
  ngOnInit(): void {
    Promise.resolve().then(() => this.loaderHelper.showLoader());
    this.getAdvertsList();
  }

  //get a list of adverts
  getAdvertsList() {
    this.advertService.getAdverts().subscribe({
      next: (adverts) => {
        this.advertsList = adverts.sort((low, high) => low.price - high.price);
        this.collectionSize = this.advertsList.length;
      },
      error: (err) => this.notificatioHelper.setErrorMessage(err),
    });
  }
  getAdvertDetails(advert: Advert) {
    this.route.navigate(['/details', advert.id]);
  }
  // sorts/oders adverts by price high or price low
  sort(event: any) {
    switch (event) {
      case 'Low': {
        this.advertsList = this.advertsList.sort(
          (low, high) => low.price - high.price
        );
        break;
      }
      case 'High': {
        this.advertsList = this.advertsList.sort(
          (low, high) => high.price - low.price
        );
        break;
      }
      default: {
        this.advertsList = this.advertsList.sort(
          (low, high) => low.price - high.price
        );
        break;
      }
    }
    return this.advertsList;
  }

  onSearch(search: Search): void {
    this.searching=true;
    this.loaderHelper.showLoader();
      this.advertService.getAdverts().subscribe({next:adverts=>{
        this.filteredAdverts=adverts.filter(advert=>advert.province.id===Number(search.province))
        this.advertsList=this.filteredAdverts;
        this.searching=false;
      }
    })
     
    
  }
}
