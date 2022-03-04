import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Role } from "../models/role.model";
import { UserManager } from "../services/account.service";


@Injectable({ providedIn: 'root' })

export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserManager
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.userService.currentUserValue;
        if (currentUser && currentUser.role===Role.Admin) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}