import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNavbar: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        this.auth.isAuthenticated$.subscribe((isAuth) => {
          this.updateNavbarVisibility(event.urlAfterRedirects, isAuth);
        });
      });
  }

  private updateNavbarVisibility(url: string, isAuth: boolean): void {
  // Only show the navbar if user is authenticated and is on /home or /weather
  this.showNavbar = isAuth && (url === '/home' || url === '/weather');
}


}

