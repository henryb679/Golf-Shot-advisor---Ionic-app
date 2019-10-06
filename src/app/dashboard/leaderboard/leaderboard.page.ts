import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../services/database.service';
import * as moment from 'moment';
import {NavController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authentication.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  golfData;
  constructor(private databaseService: DatabaseService, private navigationController: NavController,
              private firebaseAuth: AuthenticateService) { }


  ngOnInit() {
    // This ensures that the user has to be logged into the system to use the app.
    if (this.firebaseAuth.userDetails()) {
      this.firebaseAuth.email;
    } else {
      this.navigationController.navigateBack('');
    }

    // This gets the database records of the golf data and returns them in a readable format that can be interpreted by the .html file.
    this.databaseService.readAllRecord().subscribe(data => {
      this.golfData = data.map(e => {

        // Formats the date in a easier to understand form.
        let date = moment(e.payload.doc.data()['timestamp']).format("DD-MMM-YYYY HH:mm:ss");

        return {
          // These values can be easily accessible in the .html file as DOM parable objects i.e. {{Email}}
          id: e.payload.doc.id,
          Email: e.payload.doc.data()['email'],
          Timestamp: date,
          GolfCourseName: e.payload.doc.data()['golfCourseName'],
          HoleNumber: e.payload.doc.data()['holeNumber'],
          ParResult: e.payload.doc.data()['parResult'],
          HoleResult: e.payload.doc.data()['holeResult'],
        };
      });
    });
  }

}
