import { Component, OnInit } from '@angular/core';

import {AlertController, NavController} from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import {DatabaseService} from '../../services/database.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']

})
export class SettingsPage implements OnInit {

  private noOfRecord;

  constructor(
    private navigationController: NavController,
    private firebaseAuth: AuthenticateService,
    private databaseService: DatabaseService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    // This ensures that the user has to be logged into the system to use the app.
    if (this.firebaseAuth.userDetails()) {
      this.firebaseAuth.email;
    } else {
      this.navigationController.navigateBack('');
    }

    this.databaseService.readAllRecord().subscribe(data => {
      this.noOfRecord = data.filter(e => e.payload.doc.data()['email'] === this.firebaseAuth.email).map(e => e).length;
    });

  }

  logout() {
    this.firebaseAuth.logoutUser()
      .then(res => {
        this.navigationController.navigateBack('');
      })
      .catch(error => {
      });
  }

  async removeRecordAlert() {
    const alert = await this.alertController.create({
      header: 'Golf Data Record',
      message: 'Records have been removed',
      buttons: ['ok'],
    });

    await alert.present();
    await alert.onDidDismiss();
  }
}


