
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { User } from "../models/user.model";


export class UserData implements InMemoryDbService {

    createDb():{ users:User[] } {
        const users:User[]=[
            {
                "id": 1,
                "forename": "Buyani",
                "surname": "Mhlongo",
                "email": "buyanimhlongo@gmail.com",
                "password": "BSmhlongo@91",
            },
            {
                "id": 2,
                "forename": "Sabelo",
                "surname": "Shezi",
                "email": "sabeloshezi@gmail.com",
                "password": "SabeloMhlongo@91",
            },
            {
                "id": 3,
                "forename": "Nokuthula",
                "surname": "Ntombela",
                "email": "nokuthula@gmail.com",
                "password": "Nokwe@91",
            },
        ]
        return {users};
    }
}
