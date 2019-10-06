import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import * as moment from 'moment';
import {AuthenticateService} from '../services/authentication.service';


@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.page.html',
  styleUrls: ['./user-result.page.scss'],
})
export class UserResultPage implements OnInit {

  private timestamp;
  private golfCourseName;
  private holeNumber;
  private parResult;
  private holeResult;

  private parCal;
  private holeCal;

  constructor(private modalController: ModalController, private navParams: NavParams, private navigationController: NavController,
              private firebaseAuth: AuthenticateService) {

    // Get the golf data from the start advisor page which the user has entered.
    this.timestamp = this.navParams.get('timestamp');
    this.golfCourseName = this.navParams.get('golfCourseName');
    this.holeNumber = this.navParams.get('holeNumber');
    this.parResult = this.navParams.get('parResult');
    this.holeResult = this.navParams.get('holeResult');
  }

  ngOnInit() {
    // This ensures that the user has to be logged into the system to use the app.
    if (this.firebaseAuth.userDetails()) {
      this.firebaseAuth.email;
    } else {
      this.navigationController.navigateBack('');
    }

    this.timestamp = moment(this.timestamp).format('DD-MMM-YYYY HH:mm:ss');

    this.parCal = '';
    this.holeCal = '';

    // calculates the total scores as needed.
    this.parCal = this.calc(String(this.parResult).replace(/,/g, ''));
    this.holeCal = this.calc(String(this.holeResult).replace(/,/g, ''));
  }

  // When the modal is closed, this function does handles this operation.
  return() {
    this.modalController.dismiss();
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
