import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  forecastList: any[] = [];
  specCity: string = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { city: string, data: any[] };

    if (state && state.city && state.data) {
      this.specCity = state.city;
      this.forecastList = state.data;
    } else {
      // fallback in case of direct access to /weather
      this.router.navigate(['/home']);
    }
  }
}
