import { Component, OnInit } from '@angular/core';

import {ModalController, NavController, NavParams} from '@ionic/angular';
import {AuthenticateService} from '../services/authentication.service';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.page.html',
  styleUrls: ['./weather-modal.page.scss'],
})
export class WeatherModalPage implements OnInit{

  private gpsAvaiable: boolean;
  private pressure: boolean;
  private city: string;
  private temp: string;
  private minTemp: string;
  private maxTemp: string;
  private humidity: string;
  private windDirection: string;
  private weatherDescription: string;
  private weatherType: string;
  private windSpeed: string;

  constructor(public modalController: ModalController, public navParams: NavParams,
              private navigationController: NavController,
              private firebaseAuth: AuthenticateService) {

    // Parameters are taken from the home page
    this.gpsAvaiable = this.navParams.get('gpsStatus');

    this.city = this.navParams.get('city');
    this.weatherDescription = this.navParams.get('weatherDescription');
    this.temp = this.navParams.get('temp');
    this.minTemp = this.navParams.get('minTemp');
    this.maxTemp = this.navParams.get('maxTemp');
    this.humidity = this.navParams.get('humidity');
    this.pressure = this.navParams.get('pressure');
    this.windDirection = this.navParams.get('windDirection');
    this.weatherType = this.navParams.get('weatherType');
    this.windSpeed = this.navParams.get('windSpeed');
  }

  ngOnInit(): void {
    // This ensures that the user has to be logged into the system to use the app.
    if (this.firebaseAuth.userDetails()) {
      this.firebaseAuth.email;
    } else {
      this.navigationController.navigateBack('');
    }
  }

  return(){
    this.modalController.dismiss();
  }

}
