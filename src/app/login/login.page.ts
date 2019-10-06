import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  fieldValidation: FormGroup;
  errorMessage: string = '';

  constructor(
    private navigationController: NavController,
    private firebaseAuth: AuthenticateService,
    private formBuilder: FormBuilder

  ) {}

  ngOnInit() {
    // Checks the email format and makes sure both fields are not empty
    this.fieldValidation = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  // Calls the firebase auth service to autheticate the user's login.
  loginUser(value) {
    this.firebaseAuth.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = '';
      this.firebaseAuth.email = value.email;

      this.navigationController.navigateForward(['dashboard' , 'home']);
    }, err => {
      this.errorMessage = err.message;
    });
  }

  // When the register button is pressed, it refers the user to the register page.
  registerNewUser() {
    this.navigationController.navigateForward('/register');
  }
}
