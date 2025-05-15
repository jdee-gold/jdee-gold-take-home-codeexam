// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = environment.openWeatherApiKey;

  constructor(private http: HttpClient) { }

  fetchFiveDayForecast(city: string): Observable<any[]> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const allForecasts = response.list;

        const dailyMap = new Map<string, any>();

        allForecasts.forEach((item: any) => {
          const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
          dailyMap.set(date, item); // latest of the day
        });

        return Array.from(dailyMap.values())
          .sort((a, b) => b.dt - a.dt)
          .slice(0, 5);
      }),
      
      catchError(error => {
        console.error('Error fetching forecast:', error);
        return throwError(() => error); // Or return of([]) if you want to return an empty list instead
      })
    );
  }
}
