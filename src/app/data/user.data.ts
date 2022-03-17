import { InMemoryDbService } from "angular-in-memory-web-api";
import { Status } from "../models/advert-status.model";
import { Role } from "../models/role.model";


export class UserData implements InMemoryDbService {

    createDb() {
        const users = [
            {
                "id": 1,
                "forename": "Buyani",
                "surname": "Mhlongo",
                "email": "buyanimhlongo@gmail.com",
                "password": "BSmhlongo91",
                "role": Role.User
            },
            {
                "id": 2,
                "forename": "Sabelo",
                "surname": "Shezi",
                "email": "sabeloshezi@gmail.com",
                "password": "SabeloMhlongo91",
                "role": Role.User
            },
            {
                "id": 3,
                "forename": "Nokuthula",
                "surname": "Ntombela",
                "email": "nokuthula@gmail.com",
                "password": "Nokwe91",
                "role": Role.User
            },
            {
                "id": 4,
                "forename": "Admin1",
                "surname": "AdminSurname",
                "email": "admin@admin.com",
                "password": "Admin",
                "role": Role.Admin
            },
            {
                "id": 5,
                "forename": "Admin2",
                "surname": "AdminSurname",
                "email": "admin1@admin1.com",
                "password": "Admin",
                "role": Role.Admin
            },
        ]

        const adverts = [
            {
                'id': 1, 'headlineText': "5 Bedroom East gate",
                'details': `Family Home - Why Rent when you can buy

                This home is ideally situated on the border of Westville North and Reservoir Hills and is above road level.
                
                The garden is manageable and neat, there is also a swimming pool for those hot summer days.
                
                This house is neat and move in ready.
                
                Security is taken care of in the form of an alarm, burglar bars and a motorized gate.
                
                Added bonus is the 1 bedroom cottage which is seperate from the main house and is at the back of the property. A rental income of around R 4000 could be achieved.
                
                There is also a servants quarters.
                
                Call Ebrahim to view.
                `,
                'price': 1200000.00,
                "user_id": 1,
                'city': {
                    "id": 7,
                    "province_id": 3,
                    "Name": "Sandton"
                },
                'province': {
                    'id': 3,
                    'Name': 'Gauteng'
                },
                'status': Status.HIDE
            },
            {
                'id': 2, 'headlineText': "Mension Durban North",
                'details': `Family Home - Why Rent when you can buy

                This home is ideally situated on the border of Westville North and Reservoir Hills and is above road level.
                
                The garden is manageable and neat, there is also a swimming pool for those hot summer days.
                
                This house is neat and move in ready.
                
                Security is taken care of in the form of an alarm, burglar bars and a motorized gate.
                
                Added bonus is the 1 bedroom cottage which is seperate from the main house and is at the back of the property. A rental income of around R 4000 could be achieved.
                
                There is also a servants quarters.
                
                Call Ebrahim to view.
                `,
                'price': 900000.00,
                'user_id': 1,
                'city': {
                    "id": 22,
                    "province_id": 8,
                    "Name": "Durban"
                },
                'province': {
                    'id': 8,
                    'Name': 'KwaZulu Natal'
                },
                'status': Status.LIVE
            },
            {
                'id': 3, 'headlineText': "4 Bedroom House for Sale in Heuwelsig",
                'details': `Family Home - Why Rent when you can buy

                This home is ideally situated on the border of Westville North and Reservoir Hills and is above road level.
                
                The garden is manageable and neat, there is also a swimming pool for those hot summer days.
                
                This house is neat and move in ready.
                
                Security is taken care of in the form of an alarm, burglar bars and a motorized gate.
                
                Added bonus is the 1 bedroom cottage which is seperate from the main house and is at the back of the property. A rental income of around R 4000 could be achieved.
                
                There is also a servants quarters.
                
                Call Ebrahim to view.
                `,
                'price': 1800000.00,
                'user_id': 2,
                'city': {
                    "id": 3,
                    "province_id": 1,
                    "Name": "Bethlehem"
                },
                'province': {
                    'id': 1,
                    'Name': 'Free State'
                },
                'status': Status.HIDE
            }
        ]
        return { users, adverts };
    }
}
