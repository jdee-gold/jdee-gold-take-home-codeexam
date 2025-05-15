import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree  } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.isAuthenticated$.pipe(
      map(isAuth => {
        if (isAuth) {
          return true;
        } else {
          // Redirect to landing page if NOT authenticated
          return this.router.createUrlTree(['/landing']);
        }
      })
    );
  }
}
