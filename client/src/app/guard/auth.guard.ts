import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    currentUser: any;

    constructor(
        private router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = sessionStorage.getItem('pBNGAaKPbfKVFAy')
        // if (currentUser != null ) {
        //     if (state.url == "/login" || state.url == "/register") {
        //         return false;
        //     } else {
        //         return true;
        //     }
        // } else {
        //     if (state.url == "/login" || state.url == "/register") {
        //         return true
        //     } else {
        //         this.router.navigate(['/login']);
        //         return false;
        //     }

        // }
        return true

    }
}