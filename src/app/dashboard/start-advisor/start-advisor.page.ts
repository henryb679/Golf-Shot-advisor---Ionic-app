import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import * as moment from 'moment';
import {AuthenticateService} from '../../services/authentication.service';

import {ModalController, NavController} from '@ionic/angular';

import {UserResultPage} from '../../user-result/user-result.page';

@Component({
    selector: 'app-home',
    templateUrl: 'start-advisor.page.html',
    styleUrls: ['start-advisor.page.scss'],
})
export class StartAdvisorPage implements OnInit {

    golfCourseName: string;
    holeNumber: number;
    email: string;
    timestamp: moment.Moment;

    populateInputFlag = false;

    parResult = [];
    holeResult = [];

    // Par and score input ranges can be changed accordingly.
    minScore = 0;
    maxScore = 6;

    attrMaxLength = 1;

    constructor(private databaseService: DatabaseService,
                private resultModal: ModalController,
                private navigationController: NavController,
                private firebaseAuth: AuthenticateService
    ) {
        this.email = firebaseAuth.email;
    }

    ngOnInit() {
        // This ensures that the user has to be logged into the system to use the app.
        if (this.firebaseAuth.userDetails()) {
            this.firebaseAuth.email;
        }
        else {
            this.navigationController.navigateBack('');
        }
    }

    createRecord() {
        this.populateInputFlag = false;

        // Stores the inputs in suitable key: value relationship
        let record = {};
        record['email'] = this.firebaseAuth.email;
        record['timestamp'] = Date.now();
        record['golfCourseName'] = this.golfCourseName;
        record['holeNumber'] = this.holeNumber.toString();
        record['parResult'] = this.parResult.toString();
        record['holeResult'] = this.holeResult.toString();

        // Shows the result page modal to the user
        this.showResult();

        // Sends the record to the database service for processing
        this.databaseService.createNewRecord(record).then(resp => {

            // Clears the fields once the user has submitted a golf data record.
            this.email = "";
            this.timestamp = moment();
            this.golfCourseName = "";
            this.holeNumber = undefined;
            this.parResult = [];
            this.holeResult = [];

            // console.log(resp);
        })
            .catch(error => {
                // console.log(error);
            });
    }

    // When the user clicks the populate button, this function enables the flag to populate the par, score inputs
    populateInput() {
        this.populateInputFlag = true;
    }

    // This function checks the inputs of the score, par fields.
    disableGolfRecordButton() {

        // Checks the length of inputs for empty array values.
        if (this.parResult.length === 0 || this.holeResult.length === 0) {
            return true;
        }

        // Ensures the par input values are integer values and are in range.
        for (let i = 0; i < this.parResult.length; i++) {
            if (this.isInt(this.parResult[i])) {
                if (this.parResult[i] < this.minScore || this.parResult[i] > this.maxScore) {
                    return true;
                }
            } else {
                return true;
            }
        }

        // Ensures the hole input values are integer values and are in range.
        for (let i = 0; i < this.holeResult.length; i++) {
            if (this.isInt(this.holeResult[i])) {
                if (this.holeResult[i] < this.minScore || this.holeResult[i] > this.maxScore) {
                    return true;
                }
            } else {
                return true;
            }
        }

        // Checks the length of inputs for consistent array values.
        if (this.parResult.length < this.holeNumber || this.holeResult.length < this.holeNumber) {
            return true;
        }
        return false;
    }

    // When the clear input button is pressed, the hole and par results are cleared.
    clearInput() {
        for (let i = 0; i < this.parResult.length; i++) {
            this.parResult[i] = '';
        }

        for (let i = 0; i < this.holeResult.length; i++) {
            this.holeResult[i] = '';
        }
    }

    // passes in the relevant data that is needed for the weather modal
    async showResult() {
        const modal = await this.resultModal.create({
            // References to the UserResult page
            component: UserResultPage,
            componentProps: {
                timestamp: this.timestamp,
                golfCourseName: this.golfCourseName,
                holeNumber: this.holeNumber,
                parResult: this.parResult,
                holeResult: this.holeResult
            },
        });
        await modal.present();
    }

    // Checks to see if number is acutally a integer type.
    isInt(n) {
        return ((typeof n === 'number') && (n % 1 === 0));
    }
}
