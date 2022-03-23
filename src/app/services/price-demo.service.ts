import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class PriceServiceDemo{


    //get a list of  prices
    prices() {
        return [
         {"price":100000},
         {"price":200000},
         {"price":300000},
         {"price":400000},
         {"price":500000},
         {"price":600000},
         {"price":700000},
         {"price":800000},
         {"price":900000},
         {"price":100000000},
         {"price":150000000},
         {"price":180000000},
         {"price":19000000},
        ];
      }
}