import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { NotificationHelper } from 'src/app/helpers/notifications.helper';
import { Advert } from 'src/app/models/advert.model';
import { AdvertService } from 'src/app/services/advert.service';

@Component({
  selector: 'app-advertedit',
  templateUrl: './advertedit.component.html',
  styleUrls: ['./advertedit.component.css']
})
export class AdverteditComponent implements OnInit {

  advertForm:FormGroup;
  pageTitle:string;


  constructor(private route:ActivatedRoute,
             private loaderHelper:LoaderHelper,
             private advertService:AdvertService,
             private notificationHelper:NotificationHelper,
             private fb:FormBuilder) { }

  ngOnInit(): void {

    this.generateAdvertForm();
    //show loader on componets initialization
    Promise.resolve().then(()=>this.loaderHelper.showLoader());
    this.route.params.subscribe((params)=>{
      
      //get passed advertId
      const advertId=Number(params['id']);

      //call advert service pass advertId 
      this.advertService.getAdvertById(advertId).subscribe({

        //on receive advert pass advert to EditAdvert(advertId) function
        next:advert=> this.EditAdvert(advert),
        //if error occurs show error 
        error:err=>this.notificationHelper.setErrorMessage(err)
      })
    })
  }

  //get Advert to edit 
  EditAdvert(advert:Advert)
  {
    if(advert.id===0){
      this.pageTitle='';
    }
    else{
      this.pageTitle=advert.headlineText
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

  //on form save
  onSubmit():void{
    console.log(JSON.stringify(this.advertForm.value))
  }

}

