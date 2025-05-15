import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  city = '';
  user: User | null | undefined = null;
  errorMessage: string = '';
  forecastList: any[] = [];

  constructor(public auth: AuthService, private router: Router, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(profile => {
      this.user = profile;
    });
  }


  searchCity() {
    this.weatherService.fetchFiveDayForecast(this.city).subscribe({
      next: (data) => {
        this.forecastList = data;
        this.errorMessage = '';
        this.router.navigate(['/weather'], { state: { city: this.city, data } });
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
      }
    });
  }

  onCityInputChange(value: string) {
    this.city = value;
    if (!value) {
      this.errorMessage = '';  // Clear error message if input is empty
    }
  }
}
