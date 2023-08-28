import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CitiesService } from 'src/app/cities.service';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  cities: string[] = ["Singapore"];
  submitForm!: FormGroup;

  builder = inject(FormBuilder);
  service = inject(CitiesService);

  ngOnInit(): void {
    this.submitForm = this.builder.group({
      city: this.builder.control<string>('')
    })

    this.service.load().then(result => result.forEach(c => this.cities.push(c)));
  }

  addCity() {

    const city: City = {
      name: this.submitForm.value['city']
    }

    this.service.save(city);

    if (this.cities.includes(this.submitForm.value['city'])) {
      alert('City entered is already in the list!');
      return;
    }

    this.cities.push(this.submitForm.value['city']);
  }

}
