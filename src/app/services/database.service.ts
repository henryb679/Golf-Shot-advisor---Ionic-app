import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {environment} from '../../environments/environment';
import {AuthenticateService} from './authentication.service';
import {uuid} from 'ng2-validation/dist/uuid';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore, private firebaseAuth: AuthenticateService) { }

  // Create a new golf data record
  createNewRecord(record) {
    return this.firestore.collection(environment.firebaseDB.dbCollection).add(record);
  }

  // Reads the golf data records stored in the database
  readAllRecord() {
    return this.firestore.collection(environment.firebaseDB.dbCollection).snapshotChanges();
  }
}
