import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  fieldValidation: FormGroup;
  messagePrompt: string = '';

  constructor(
    private navigationController: NavController,
    private firebaseAuth: AuthenticateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Validates the input fields for the register page.
    this.fieldValidation = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  // Calls the register firebase service to create a new account.
  registerNewUser(value) {
    this.firebaseAuth.registerUser(value)
     .then(res => {
       // console.log(res);
       this.messagePrompt = 'The account has been created. Please log in.';
     }, err => {
       // console.log(err);
       this.messagePrompt = err.message;
     });
  }

  // When the return button is pressed, the user is navigated to the login page
  loginPage() {
    this.navigationController.navigateBack('');
  }

}
