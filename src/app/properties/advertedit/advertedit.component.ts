import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import Validation from 'src/app/helpers/validators.helper';
import { Advert } from 'src/app/models/advert.model';
import { City } from 'src/app/models/city.model';
import { Province } from 'src/app/models/province.model';
import { User } from 'src/app/models/user.model';
import { UserManager } from 'src/app/services/account.service';
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
  advert:Advert[];
  currentUser:User;
  advertId:number;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private loaderHelper: LoaderHelper,
    private advertService: AdvertService,
    private notificationHelper: NotificationHelper,
    private geoService: GeoGraphicService,
    private userService:UserManager,
    private fb: FormBuilder
  ) {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.pronvinces = this.geoService.getPrivinces();
    this.generateAdvertForm();
    //show loader on componets initialization
    this.route.params.subscribe((params) => {
      //get passed advertId
      this.advertId = Number(params['id']);

      if ( this.advertId > 0) {
        //call advert service pass advertId
        this.advertService.getAdvertById( this.advertId).subscribe({
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
        price: advert.price
      });
    }
  }
//save /update an advert
  SaveAdvert() {
    this.loaderHelper.showLoader();
    if(this.advertForm.valid){
      if(this.advertForm.dirty)
      {
        //map form object to Advert object
        const advert=this.createAdvertObject({ ...this.advert, ...this.advertForm.value})
        //if advertid is not less than 0 it means ita an update else save 
        if(this.advertId>0){
          advert.id=this.advertId;
          this.advertService.updateAdvert(advert).subscribe({
            next:()=>this.Complete(),
            error:(err)=>this.notificationHelper.setErrorMessage(err)
          })
        }
        else{
          this.advertService.createNewAdvert(advert).subscribe({
            next:()=>this.Complete(),
            error:(err)=>this.notificationHelper.setErrorMessage(err)
          })
        }
      }
      else{

      }
    }else{
      console.log("Form invalid")
    }
  }
  //create advert object based on selected id's of (province and city)
  createAdvertObject(advert:Advert):Advert{
    let ad=advert;
    let province=this.geoService.getPrivinces().find(p=>p.id===Number(advert.province));
    let city=this.geoService.getCities().find(c=>c.id=== Number(advert.city));
    if(province && city){
      ad.city=city.Name;
      ad.province=province.Name;
      ad.user_id=Number(this.currentUser.id);
    }
    return advert;
  }

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
        [Validators.required, Validators.min(10000), Validators.max(100000000)],
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

  Complete():void{
    this.loaderHelper.hideLoader();
    this.router.navigate(['/myadverts']);
    this.advertForm.reset();
  }

  //on form save
  onSubmit():void{
    if (!this.advertForm.valid) {
      this.advertForm.markAllAsTouched();
    } else {
      this.SaveAdvert();
    }
  }
}
