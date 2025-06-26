// src/app/services/weather.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { ForecastResponse, ForecastItem } from '../models/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = environment.openWeatherApiKey;
  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) { }

  fetchFiveDayForecast(city: string): Observable<ForecastItem[]> {
    this.isLoading.set(true);
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${this.apiKey}`;

    return this.http.get<ForecastResponse>(url).pipe(
      map(response => {
        const allForecasts = response.list;

        const today = new Date();
        const todayDate = today.toLocaleDateString('en-US');
        const dailyMap = new Map<string, ForecastItem>();

        allForecasts.forEach((item: ForecastItem) => {
          const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
          dailyMap.set(date, item); // latest of the day

          // If date not yet in the map, set the first (earliest) item of that day
          if (!dailyMap.has(date)) {
            dailyMap.set(date, item);
          }
        });
        this.isLoading.set(false);
        return Array.from(dailyMap.values())
          .filter(item => {
            const itemDate = new Date(item.dt * 1000).toLocaleDateString('en-US');
            return new Date(itemDate) >= new Date(todayDate);
          }) // ensure today's and future
          .sort((a, b) => {
            const dateA = new Date(new Date(a.dt * 1000).toLocaleDateString('en-US')).getTime();
            const dateB = new Date(new Date(b.dt * 1000).toLocaleDateString('en-US')).getTime();
            return dateA - dateB;
          });
      }),

      catchError(error => {
        console.error('Error fetching forecast:', error);
        return throwError(() => error); // Or return of([]) to return an empty list instead
      })
    );
  }
}
