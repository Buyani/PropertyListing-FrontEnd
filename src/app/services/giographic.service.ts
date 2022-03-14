import { Injectable } from "@angular/core";
import { City } from "../models/city.model";
import { Province } from "../models/province.model";

@Injectable({
    providedIn:'root'
})
export class GeoGraphicService{
    getPrivinces() {
        return [
         {"id":1,"Name":"Free State"},
         {"id":2,"Name":"Eastern Cape"},
         {"id":3,"Name":"Gauteng"},
         {"id":4,"Name":"Limpopo"},
         {"id":5,"Name":"Mpumalanga"},
         {"id":6,"Name":"Northern Cape"},
         {"id":7,"Name":"North West"},
         {"id":8,"Name":"KwaZulu Natal"},
         {"id":9,"Name":"Western Cape"}

        ];
      }

      getCities() {
       return [
        //Free State
        {"id":1,"province_id":1,"Name":"Harrismith"},
        {"id":2,"province_id":1,"Name":"Welkom"},
        {"id":3,"province_id":1,"Name":"Bethlehem"},

        //Eastern Cape
        {"id":4,"province_id":2,"Name":"Elizabeth"},
        {"id":5,"province_id":2,"Name":"Grahamstown"},
        {"id":6,"province_id":2,"Name":"Mthatha"},

        //Gauteng
        {"id":7,"province_id":3,"Name":"Sandton"},
        {"id":8,"province_id":3,"Name":"Soweto"},
        {"id":9,"province_id":3,"Name":"Mshongo"},

        //Limpopo
        {"id":10,"province_id":4,"Name":"Bela-Bela"},
        {"id":11,"province_id":4,"Name":"Lephalale"},
        {"id":12,"province_id":4,"Name":"Makhado"},

        //Mpumalanga
        {"id":13,"province_id":5,"Name":"Parktown"},
        {"id":14,"province_id":5,"Name":"Parklands"},
        {"id":15,"province_id":5,"Name":"Ormonde"},

        //Northern Cape
        {"id":16,"province_id":6,"Name":" Jan Kempdorp"},
        {"id":17,"province_id":6,"Name":"Hartswater"},
        {"id":18,"province_id":6,"Name":"Kimberley"},

        //North West
        {"id":19,"province_id":7,"Name":"Hartebeespoort"},
        {"id":20,"province_id":7,"Name":"Rustenburg"},
        {"id":21,"province_id":7,"Name":"Hartebeespoort"},

        //KwaZulu Natal
        {"id":22,"province_id":8,"Name":"Durban"},
        {"id":23,"province_id":8,"Name":"Richards Bay"},
        {"id":24,"province_id":8,"Name":"Newcastle"},

        //Western Cape
        {"id":25,"province_id":9,"Name":"Barrydale"},
        {"id":26,"province_id":9,"Name":"Bredasdorp"},
        {"id":27,"province_id":9,"Name":"Cape Town "},
        ];
      }
}


