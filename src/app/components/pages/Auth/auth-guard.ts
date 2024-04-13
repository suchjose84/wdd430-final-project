// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
// import AuthService from "./auth.service";
// import { Observable } from "rxjs";

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private authService: AuthService, private router: Router){

//     }
//     canActivate(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot,

//     ): boolean | Observable<boolean> | Promise<boolean> {
//         const isAuth = this.authService.getIsAuth();
//         if(!isAuth) {
//             this.router.navigate(['/login']);
//         }
//         return isAuth;
//     }
// }

//the new way

import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';

import AuthService from './auth.service';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const isAuth = authService.getIsAuth();
    if (!isAuth) {
        return router.createUrlTree(['/login']);
    }
    return isAuth;
};
