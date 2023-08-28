import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Weather } from '../../models/weather';
import { WeatherService } from 'src/app/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private title = inject(Title);
  private service = inject(WeatherService);

  city!: string;
  model = new Weather("", "", "", 0, 0, 0, 0, 0, 0);

  ngOnInit(): void {
    this.city = this.activatedRoute.snapshot.params['city'];

    this.title.setTitle('Weather information for ' + this.city);

    this.service.getWeather(this.city).subscribe((result) => {
      this.model = new Weather(
        result.city, result.current_status, result.description, result.temperature,
        result.feels_like, result.min_temp, result.max_temp, result.pressure, result.humidity
      )
    })
  }

}
