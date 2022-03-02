import { Subject } from "rxjs";
import { User } from "../models/user.model";



export class AuthService{
    private currentUser=new Subject<User>();
    
}