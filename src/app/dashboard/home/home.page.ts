import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';

import { Geolocation} from '@capacitor/core';
import { HttpClient } from '@angular/common/http';

import { WeatherModalPage} from '../../weather-modal/weather-modal.page';
import { AlertController } from '@ionic/angular';
import {DatabaseService} from '../../services/database.service';
import * as moment from 'moment';
import {WeatherService} from '../../services/weather.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

    private latitude: number;
    private longitude: number;

    private weatherJSON;

    private weatherType: string;
    private temp: string;
    private city: string;
    private windSpeed: string;

    private pressure: string;
    private humidity: string;
    private minTemp: string;
    private maxTemp: string;
    private weatherDescription: string;
    private windDirection: string;

    private gpsAvailable: boolean;
    private golfData;

    constructor(
        private navigationController: NavController,
        private firebaseAuth: AuthenticateService,
        private http: HttpClient,
        private weatherModal: ModalController,
        public alertController: AlertController,
        private databaseService: DatabaseService,
        private weatherService: WeatherService
    ) {

    }

    ngOnInit() {
        // This ensures that the user has to be logged into the system to use the app.
        if (this.firebaseAuth.userDetails()) {
            this.firebaseAuth.email;
        } else {
            this.navigationController.navigateBack('');
        }

        this.getLocation()
            .then(res => {
                this.weatherService.getWeatherData(this.latitude, this.longitude).subscribe(data => {
                    // console.log(data);

                    // converts the JSON object into a string
                    this.weatherJSON = JSON.stringify(data);

                    this.weatherJSON = this.weatherJSON.replace(/[\[\]']+/g, '');

                    // Converting JSON object to JS object
                    let obj = JSON.parse(this.weatherJSON);

                    // Define recursive function to print nested values
                    function sortJsonObject(obj) {
                        for (let k in obj) {
                            if (obj[k] instanceof Object) {
                                sortJsonObject(obj[k]);
                            }
                        }
                    }

                    // printValues(this.weatherJSON);

                    this.weatherType = obj.weather.main;

                    // sets the weather icon based on the current weather conditions.
                    this.getWeatherIcon();

                    this.city = obj.name;
                    this.temp = obj.main.temp;
                    this.windSpeed = obj.wind.speed;
                    this.gpsAvailable = true;
                    this.pressure = obj.main.pressure;
                    this.humidity = obj.main.humidity;
                    this.minTemp = obj.main.temp_min;
                    this.maxTemp = obj.main.temp_max;
                    this.weatherDescription = obj.weather.description;
                    this.windDirection = obj.wind.deg;

                    // console.log(this.weatherDescription);
                    this.gpsAvailable = true;
                });

            }).catch(error => {
            // alert('GPS not available');
            this.gpsAvailable = false;
            this.gpsAlert();
        });

        this.databaseService.readAllRecord().subscribe(data => {
            this.golfData = data.filter(e => e.payload.doc.data()['email'] === this.firebaseAuth.email).map(e => {

                let date = moment(e.payload.doc.data()['timestamp']).format('DD-MMM-YYYY HH:mm:ss');
                let parCal = this.calc(String(e.payload.doc.data()['parResult']).replace(/,/g, ''));
                let holeCal = this.calc(String(e.payload.doc.data()['holeResult']).replace(/,/g, ''));

                return {
                    Timestamp: date,
                    GolfCourseName: e.payload.doc.data()['golfCourseName'],
                    HoleNumber: e.payload.doc.data()['holeNumber'],
                    ParResult: e.payload.doc.data()['parResult'],
                    HoleResult: e.payload.doc.data()['holeResult'],
                    ParCal: parCal,
                    HoleCal: holeCal,
                };
            });
        });
    }


    // Get the GPS location of the device
    async getLocation() {
        const position = await Geolocation.getCurrentPosition();
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
    }

    // passes in the relevant data that is needed for the weather modal
    async showModal() {
        const modal = await this.weatherModal.create({
            component: WeatherModalPage,
            componentProps: {gpsStatus: this.gpsAvailable,
                city: this.city, temp: this.temp, windSpeed: this.windSpeed,
                pressure: this.pressure, humidity: this.humidity, minTemp: this.minTemp,
                maxTemp: this.maxTemp, weatherDescription: this.weatherDescription, windDirection: this.windDirection, weatherType: this.weatherType},
        });
        await modal.present();

    }

    // Gets the weather icon associated to the current weather condition. Based on the icons from https://ionicons.com/
    getWeatherIcon() {
        switch (this.weatherType) {
            case 'Thunderstorm':
                this.weatherType = 'thunderstorm';
                break;

            case 'Rain':
            case 'Snow':
            case 'Mist':
            case 'Drizzle':
                this.weatherType = 'rainy';
                break;

            case 'Smoke':
            case 'Ash':
            case 'Squall':
            case 'Tornado':
                this.weatherType = 'flash';
                break;

            case 'Clouds':
            case 'Dust':
            case 'Fog':
            case 'Sand':
                this.weatherType = 'cloud';
                break;

            case 'Clear':
                this.weatherType = 'sunny';
                break;
            default:
                this.weatherType = 'sunny';
        }
    }


    async gpsAlert() {
        const alert = await this.alertController.create({
            header: 'Geolocation',
            message: 'GPS is required to show weather information',
            buttons: ['ok'],
        });

        await alert.present();
        await alert.onDidDismiss();
    }

    // used to add up all the numbers in the par and hole array
    calc(n) {
        const str = n.toString().split('');
        let sum = 0;
        for (let i = 0; i <= str.length - 1; i++) {
            sum += Number(str[i]);
        }
        return sum;
    }


}
