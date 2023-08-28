import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './components/city-list/city-list.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';

const routes: Routes = [
  {path: '', component: CityListComponent, title: 'Home Page'},
  {path: 'weather/:city', component: WeatherDetailsComponent},
  {path: '**', redirectTo: '', pathMatch: 'prefix'}
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
