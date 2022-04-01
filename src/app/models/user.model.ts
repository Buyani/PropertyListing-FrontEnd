import { AccountStatus } from "./account-status.model";
import { Role } from "./role.model";

export class User{
    id:number;
    forename:string;
    surname:string;
    email:string;
    role:Role;
    password:string;
    cellphone?:string;
    locked:AccountStatus;
}