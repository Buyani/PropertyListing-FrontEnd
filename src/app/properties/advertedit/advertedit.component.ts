import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import Validation from 'src/app/helpers/validators.helper';
import { Advert } from 'src/app/models/advert.model';
import { City } from 'src/app/models/city.model';
import { Province } from 'src/app/models/province.model';
import { AdvertService } from 'src/app/services/advert.service';
import { GeoGraphicService } from 'src/app/services/giographic.service';

@Component({
  selector: 'app-advertedit',
  templateUrl: './advertedit.component.html',
  styleUrls: ['./advertedit.component.css'],
})
export class AdverteditComponent implements OnInit {
  advertForm: FormGroup;
  pageTitle: string;
  pronvinces: Province[];
  cities: City[];

  constructor(
    private route: ActivatedRoute,
    private loaderHelper: LoaderHelper,
    private advertService: AdvertService,
    private notificationHelper: NotificationHelper,
    private geoService: GeoGraphicService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.pronvinces = this.geoService.getPrivinces();
    this.generateAdvertForm();
    //show loader on componets initialization
    this.route.params.subscribe((params) => {
      //get passed advertId
      const advertId = Number(params['id']);

      if (advertId > 0) {
        //call advert service pass advertId
        this.advertService.getAdvertById(advertId).subscribe({
          //on receive advert pass advert to EditAdvert(advertId) function
          next: (advert) => this.EditAdvert(advert),
          //if error occurs show error
          error: (err) => this.notificationHelper.setErrorMessage(err),
        });
      } else {
        //initilize an empty advert
        this.EditAdvert(this.advertService.InitialiseNewAdvert());
      }
    });
  }

  //get Advert to edit
  EditAdvert(advert: Advert) {
    if (advert.id === 0) {
      this.pageTitle = 'Add New Advert';
    } else {
      this.pageTitle = 'Edit :' + advert.headlineText;
      //auto populate form values
      this.advertForm.setValue({
        headlineText: advert.headlineText,
        province: advert.province,
        city: advert.city,
        details: advert.details,
        price: advert.price,
        user_id: advert.user_id,
      });
    }
  }

  SaveAdvert() {}

  //generate advert form
  generateAdvertForm(): void {
    this.advertForm = this.fb.group({
      headlineText: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      province: ['', [Validators.required]],
      city: ['', Validators.required],
      details: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      price: [
        '',
        [Validators.required, Validators.min(10000), Validation.cannotContainSpace, Validators.max(100000000)],
      ],
    });
  }

  //easy way to acces from controls
  get f() {
    return this.advertForm.controls;
  }
  //populate cities on province select
  onProvinceSelect(selected: any) {
    let provinceId = selected.target.value;
    this.cities = this.geoService
      .getCities()
      .filter((city) => city.province_id === Number(provinceId));
  }

  //on form save
  onSubmit() {
    if (!this.advertForm.valid) {
      this.advertForm.markAllAsTouched();
    } else {
      this.SaveAdvert();
    }
  }
}
