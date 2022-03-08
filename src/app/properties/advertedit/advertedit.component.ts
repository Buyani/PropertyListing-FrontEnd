import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import { Advert } from 'src/app/models/advert.model';
import { City } from 'src/app/models/city.model';
import { Province } from 'src/app/models/province.model';
import { AdvertService } from 'src/app/services/advert.service';
import { GeoGraphicService } from 'src/app/services/giographic.service';

@Component({
  selector: 'app-advertedit',
  templateUrl: './advertedit.component.html',
  styleUrls: ['./advertedit.component.css']
})
export class AdverteditComponent implements OnInit {

  advertForm:FormGroup;
  pageTitle:string;
  pronvinces:Province[];
  cities :City[];


  constructor(private route:ActivatedRoute,
             private loaderHelper:LoaderHelper,
             private advertService:AdvertService,
             private notificationHelper:NotificationHelper,
             private geoService:GeoGraphicService,
             private fb:FormBuilder) { }

  ngOnInit(): void {
    this.pronvinces=this.geoService.getPrivinces();
    this.generateAdvertForm();
    //show loader on componets initialization
    this.route.params.subscribe((params)=>{
      
      //get passed advertId
      const advertId=Number(params['id']);

      if(advertId>0)
      {
        //call advert service pass advertId 
        this.advertService.getAdvertById(advertId).subscribe({
          //on receive advert pass advert to EditAdvert(advertId) function
          next:advert=> this.EditAdvert(advert),
          //if error occurs show error 
          error:err=>this.notificationHelper.setErrorMessage(err)
        })
      }
      else{
        //initilize an empty advert
        this.EditAdvert( this.advertService.InitialiseNewAdvert());
      }
    })
  }

  //get Advert to edit 
  EditAdvert(advert:Advert)
  {
    if(advert.id===0){
      this.pageTitle='Add New Advert';
    }
    else{
      this.pageTitle="Edit :"+advert.headlineText
      //auto populate form values
      this.advertForm.setValue({
        headlineText: advert.headlineText,
        province:advert.province,
        city:advert.city,
        details:advert.details,
        price:advert.price,
        user_id:advert.user_id
      })
    }
  }

  //generate advert form
  generateAdvertForm():void{
    this.advertForm=this.fb.group({
      headlineText:['',Validators.required],
      province:['',Validators.required],
      city:['',Validators.required],
      details:['',Validators.required],
      price:['',Validators.required],
      user_id:['',Validators.required],
    })
  }
  //populate cities on province select
  onProvinceSelect(selected:any) {
    let provinceId=selected.target.value;
    this.cities=this.geoService.getCities().filter((city)=>city.province_id=== Number(provinceId));
    console.log(this.cities);
  }

  //on form save
  onSubmit():void{
    console.log(JSON.stringify(this.advertForm.value))
  }

}

