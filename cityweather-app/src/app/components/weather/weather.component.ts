import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  forecastList: any[] = [];
  specCity: string = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.auth.isAuthenticated$.subscribe(isAuth => {
      const nav = this.router.getCurrentNavigation();
      const state = nav?.extras?.state as { city: string, data: any[] };

      if (state?.city && state?.data) {
        this.specCity = state.city;
        this.forecastList = state.data;
      } else {
        // User is logged in but no data was passed
        this.router.navigate(['/home']);
      }
    });
  }
}
