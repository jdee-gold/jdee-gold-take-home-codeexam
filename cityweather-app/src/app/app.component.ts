import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) { }
  title = 'WeatherCityApp'
  ngOnInit(): void {
    this.auth.handleRedirectCallback().subscribe({
      next: (result) => {
        console.log('Redirect callback complete:', result);
      },
      error: (err) => {
        console.error('Redirect error:', err);
      }
    });
  }

  get isLoginPage(): boolean {
    return this.router.url === '/landing';
  }
}
