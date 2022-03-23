import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { City } from 'src/app/models/city.model';
import { Province } from 'src/app/models/province.model';
import { Search } from 'src/app/models/search.mode.';
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
  pricelist:any;
  pronvinces: Province[];
  @Output() orderByEvent: EventEmitter<String> = new EventEmitter<String>();
  @Output() searchEvent: EventEmitter<Search> = new EventEmitter<Search>();
  @ViewChild('searchRef') usernameElementRef: ElementRef;

  constructor(private fb: FormBuilder, 
    private geoService: GeoGraphicService,
    private priceservice:PriceServiceDemo) {}

  ngOnInit(): void {
    this.createSearchForm();
    //load prices
    this.pricelist=this.priceservice.prices();
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
    this.searchEvent.emit(search);
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
}
