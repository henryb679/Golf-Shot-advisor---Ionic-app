import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticateService {
  public email;

  constructor() {}

  // Gets the current state of whether a user is logged in or not.
  userDetails() {
    return firebase.auth().currentUser;
  }

  // Logs the user into the system via a promise.
  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
          .then(
              res => resolve(res),
              err => reject(err));
    });
  }

  // Logs out the user into the system via a promise.
  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
            .then(() => {
              resolve();
              // alert('You have now logged out');
            }).catch((error) => {
          reject();
          // alert('Connection issue try again later');
        });
      }
    });
  }

  // Registers the user into the system via a promise.
  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
          .then(
              res => resolve(res),
              err => reject(err),
              // alert("Connection issue try again later or account already exists")
          );
    });
  }

}
