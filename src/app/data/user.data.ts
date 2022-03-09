import { InMemoryDbService } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { Advert } from "../models/advert.model";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";


export class UserData implements InMemoryDbService {

    createDb(){
        const users=[
            {
                "id": 1,
                "forename": "Buyani",
                "surname": "Mhlongo",
                "email": "buyanimhlongo@gmail.com",
                "password": "BSmhlongo91",
                "role":Role.User
            },
            {
                "id": 2,
                "forename": "Sabelo",
                "surname": "Shezi",
                "email": "sabeloshezi@gmail.com",
                "password": "SabeloMhlongo91",
                "role":Role.User
            },
            {
                "id": 3,
                "forename": "Nokuthula",
                "surname": "Ntombela",
                "email": "nokuthula@gmail.com",
                "password": "Nokwe91",
                "role":Role.User
            },
            {
                "id": 4,
                "forename": "Admin1",
                "surname": "AdminSurname",
                "email": "admin@admin.com",
                "password": "Admin",
                "role":Role.Admin
            },
            {
                "id": 5,
                "forename": "Admin2",
                "surname": "AdminSurname",
                "email": "admin1@admin1.com",
                "password": "Admin",
                "role":Role.Admin
            },
        ]

        const adverts=[
            { 'id':1,'headlineText':"5 Bedroom East gate",'province':"Johanesburg",
            'city':"Sandton",
            'details':"This are the details",
            'price':1200000.00,"user_id":1,'city_id':7,'province_id':3},
            { 'id':2, 'headlineText':"Mension Durban North",'province':"KwaZulu Natal",
            'city':"Durban",
            'details':"This are the details",
            'price':900000.00,'user_id':1,'city_id':22,'province_id':8},
            { 'id':3, 'headlineText':"4 Bedroom House for Sale in Heuwelsig",'province':"Free State",
            'city':"Bethlehem",
            'details':"This are the details",
            'price':1800000.00,'user_id':2,'city_id':1,'province_id':1}
        ]
        return {users,adverts};
    }
}
