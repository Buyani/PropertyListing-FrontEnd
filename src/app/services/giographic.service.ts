import { city } from "../models/city.model";
import { Province } from "../models/province.model";


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
        //Gauteng
        {"id":1,"province_id":1,"Name":"Alberton"},
        {"id":2,"province_id":1,"Name":"Benoni"},
        {"id":3,"province_id":1,"Name":"Boksburg"},


        {"id":4,"province_id":2,"Name":"Elizabeth"},
        {"id":5,"province_id":2,"Name":"Grahamstown"},
        {"id":6,"province_id":2,"Name":"Mthatha"},


        {"id":7,"province_id":3,"Name":"Alberton"},
        {"id":8,"province_id":3,"Name":"Alberton"},
        {"id":9,"province_id":3,"Name":"Alberton"},


        {"id":10,"province_id":4,"Name":"Alberton"},
        {"id":11,"province_id":4,"Name":"Alberton"},
        {"id":12,"province_id":4,"Name":"Alberton"},


        {"id":13,"province_id":5,"Name":"Alberton"},
        {"id":14,"province_id":5,"Name":"Alberton"},
        {"id":15,"province_id":5,"Name":"Alberton"},


        {"id":16,"province_id":6,"Name":"Alberton"},
        {"id":17,"province_id":6,"Name":"Alberton"},
        {"id":18,"province_id":6,"Name":"Alberton"},


        {"id":19,"province_id":7,"Name":"Alberton"},
        {"id":20,"province_id":7,"Name":"Alberton"},
        {"id":21,"province_id":7,"Name":"Alberton"},


        {"id":22,"province_id":8,"Name":"Alberton"},
        {"id":23,"province_id":8,"Name":"Alberton"},
        {"id":24,"province_id":8,"Name":"Alberton"},


        {"id":25,"province_id":9,"Name":"Alberton"},
        {"id":26,"province_id":9,"Name":"Alberton"},
        {"id":27,"province_id":9,"Name":"Alberton"},
        ];
      }
}


