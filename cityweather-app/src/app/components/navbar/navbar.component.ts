import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  currentRoute: string = '';
  showNavbar = false;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(loggedIn => {
      this.isAuthenticated = loggedIn;
      this.updateNavbarVisibility(this.router.url, loggedIn);
    });

    // Set the initial route manually
    this.currentRoute = this.router.url;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.updateNavbarVisibility(this.currentRoute, this.isAuthenticated);
      }
    });
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin} });
  }

  private updateNavbarVisibility(route: string, isAuth: boolean) {
    this.showNavbar = isAuth && (route === '/home' || route === '/weather');
  }
}
