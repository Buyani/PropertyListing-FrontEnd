import { City } from "./city.model";
import { Province } from "./province.model";

export class Advert{
    id:number;
    headlineText:string;
    details:string;
    price:number;
    user_id:number;
    province:Province;
    city:City;
}
