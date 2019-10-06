import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  // Get the weather via the open weather API service through a httpClient call
  getWeatherData(latitude, longitude) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid='
        + environment.openWeatherAPI.apiKey + '&units=metric';

    console.log(url);
    return this.http.get(url);
  }
}
