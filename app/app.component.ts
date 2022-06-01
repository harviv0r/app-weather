import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  apikey = "4f0c5f237b428cfe861db9dc06e5875a"
  url = (location: any) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apikey}`;

  title = 'weather';
  temp: any = "...";
  name: any = "";
  tempMax: any = "";
  tempMin: any = "";
  humidity: any = "";
  wind: any = "";
  input:any="";

  constructor() {}

  ngOnInit() {
    this.getWeatherByLocation("Madrid");
  }

  async getWeatherByLocation(location:any) {
    const resp = await fetch(this.url(location), {
        origin: "cors"
      }as any);
    const respData = await resp.json();
    this.temp = this.KtoC(respData.main.temp);
    this.name = respData.name;
    this.tempMax = this.KtoC(respData.main.temp_max);
    this.tempMin = this.KtoC(respData.main.temp_min);
    this.humidity = (respData.main.humidity);
    this.wind = (respData.wind.speed);
  }

  KtoC(k: number) {
    return (k - 273.15).toFixed();
  }

  search() {
    if (this.input) {
      this.getWeatherByLocation(this.input);
    }
   let i= document.querySelector("input") as HTMLInputElement;
   i.value=""
  };
}

