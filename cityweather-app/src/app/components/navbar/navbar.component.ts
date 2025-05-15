import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated = false;
  currentRoute: string = '';

  constructor(public auth: AuthService, private router: Router) { }

  get isLoginPage(): boolean {
  return this.router.url === '/landing';
}

  ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(status => {
    this.isAuthenticated = status;
  });

  this.router.events.subscribe(() => {
    this.currentRoute = this.router.url;
  });
}

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

}
