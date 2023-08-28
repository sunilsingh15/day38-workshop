import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  apiURL: string = "http://localhost:8080/api/weather/";

  getWeather(city: string): Observable<any> {
    return this.http.get(this.apiURL + city);
  }
}
