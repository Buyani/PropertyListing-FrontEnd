import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class PriceServiceDemo{


    //get a list of  prices
    prices() {
        return [
         {"price":100000.00},
         {"price":200000.00},
         {"price":300000.00},
         {"price":400000.00},
         {"price":500000.00},
         {"price":600000.00},
         {"price":7000000.00},
         {"price":800000.00},
         {"price":900000.00},
         {"price":100000000.00},
         {"price":150000000.00},
         {"price":1800000.00},
         {"price":19000000.00},
        ];
      }
}