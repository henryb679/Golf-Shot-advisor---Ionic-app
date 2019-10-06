import { Component, OnInit } from '@angular/core';

import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';

@Component({
  selector: 'app-handler',
  templateUrl: './handler.page.html',
  styleUrls: ['./handler.page.scss'],
})

export class HandlerPage implements OnInit {

  constructor(
      private navigationController: NavController,
      private firebaseAuth: AuthenticateService
  ) { }

  ngOnInit() {
    // This ensures that the user has to be logged into the system to use the app.
    if (this.firebaseAuth.userDetails()) {
      this.firebaseAuth.email;
    }
    else {
      this.navigationController.navigateBack('');
    }
  }
}

