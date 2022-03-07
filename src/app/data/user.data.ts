
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";


export class UserData implements InMemoryDbService {

    createDb():{ users:User[] } {
        const users:User[]=[
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
                "password": "SabeloMhlongo@91",
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
        return {users};
    }
}
