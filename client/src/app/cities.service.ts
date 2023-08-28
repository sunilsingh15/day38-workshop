import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { City } from './models/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService extends Dexie {


  cities: Dexie.Table<City, number>;

    constructor() {
      super('citiesDB');

      this.version(1).stores({
        cities: '++cityId, name'
      })

      this.cities = this.table('cities');
    }

    save(data: City) {
      return this.cities.add(data);
    }

    load(): Promise<string[]> {
      return this.cities.toArray().then(result => {return result.map(result => result.name)})
    }

}
