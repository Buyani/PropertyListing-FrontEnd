import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { Advert } from 'src/app/models/advert.model';
import { City } from 'src/app/models/city.model';
import { Province } from 'src/app/models/province.model';
import { Search } from 'src/app/models/search.mode.';
import { AdvertService } from 'src/app/services/advert.service';
import { GeoGraphicService } from 'src/app/services/giographic.service';
import { PriceServiceDemo } from 'src/app/services/price-demo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  search: Search;
  cities: City[];
  pricelist: any;
  pronvinces: Province[];
  advertsCollection: Advert[];

  @Output() orderByEvent: EventEmitter<String> = new EventEmitter<String>();
  @Output() searchEvent: EventEmitter<Advert[]> = new EventEmitter<Advert[]>();
  @ViewChild('searchRef') usernameElementRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private geoService: GeoGraphicService,
    private advertService: AdvertService,
    private priceservice: PriceServiceDemo,
    private loaderHelper: LoaderHelper
  ) {}

  ngOnInit(): void {
    this.createSearchForm();
    //load prices
    this.pricelist = this.priceservice.prices();
    //load provinces for dropdown
    this.pronvinces = this.geoService.getPrivinces();
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      province: [],
      city: [],
      minPrice: [],
      maxPrice: [],
      keyWord: [''],
    });
  }

  //on selected orderby option
  onOrderBy(value: any): void {
    this.orderByEvent.emit(value.target.value);
  }

  //when search button is clicked
  searchKeyWord(): void {
    const search = { ...this.search, ...this.searchForm.value };
    this.onSearch(search);
  }
  onProvinceSelect(selected: any) {
    let provinceId = selected.target.value;

    //set city value to null when choosing a new province
    this.searchForm.patchValue({
      city: null,
    });

    this.cities = this.geoService
      .getCities()
      .filter((city) => city.province_id === Number(provinceId));
  }

  onSearch(search: Search): void {
    this.loaderHelper.showLoader();
    this.advertService.getAdverts().subscribe({
      next: (data) => {
        this.advertsCollection = data;

        //keyWord
        if (search.keyWord) {
          this.searchEvent.emit(
            this.advertsCollection.filter(
              (advert) =>
                advert.headlineText
                  .toLowerCase()
                  .indexOf(search.keyWord.toLowerCase()) !== -1
            )
          );
        }

        //province
        if (search.province && !search.city) {
          this.searchEvent.emit(
            this.advertsCollection.filter(
              (advert) => advert.province.id === Number(search.province)
            )
          );
        }

        //province and city
        if (search.province && search.city) {
          this.searchEvent.emit(
            this.advertsCollection.filter(
              (advert) =>
                advert.province.id === Number(search.province) &&
                advert.city.id === Number(search.city)
            )
          );
        }

        //province, Min ,City
        if (search.province && search.city) {
          this.searchEvent.emit(
            this.advertsCollection.filter(
              (advert) =>
                advert.province.id === Number(search.province) &&
                advert.city.id === Number(search.city) &&
                advert.price >= Number(search.minPrice)
            )
          );
        }

        //province, Min ,City and Max
        if (search.province && search.city) {
          this.searchEvent.emit(
            this.advertsCollection.filter(
              (advert) =>
                advert.province.id === Number(search.province) &&
                advert.city.id === Number(search.city) &&
                advert.price >= Number(search.minPrice) &&
                advert.price <= Number(search.maxPrice)
            )
          );
        }

        //province ,City and Max
        if (search.province && search.city) {
          this.searchEvent.emit(
            this.advertsCollection.filter(
              (advert) =>
                advert.province.id === Number(search.province) &&
                advert.city.id === Number(search.city) &&
                advert.price <= Number(search.maxPrice)
            )
          );
        }
      },
    });
  }
}
