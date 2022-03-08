import { Role } from "./role.model";

export class User{
    id:number;
    forename:string;
    surname:string;
    email:string;
    role:Role;
    password:string;
}