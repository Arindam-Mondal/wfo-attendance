import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, query, where} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {WfoAttendance} from '../model/calendar.interface';

@Injectable({
  providedIn: 'root'
})
export class CalenderFirebaseService {

  constructor() { }

  firestore = inject(Firestore);
  wfoAttendanceCollection = collection(this.firestore, 'wfo-attendance');

  //Getting WFO dates from firebase
  //Ideally it does not return the id so had to use the idField explicitly
  getWfoAttendance() : Observable<WfoAttendance[]> {
    return collectionData(this.wfoAttendanceCollection, {
      idField: 'id'
    }) as Observable<WfoAttendance[]>;
  }

  getWfoAttendanceByUsername(username: string) : Observable<WfoAttendance[]> {
    const wfoAttendanceQuery = query(this.wfoAttendanceCollection, where("username", "==", username));
    return collectionData(wfoAttendanceQuery, {
      idField: 'id'
    }) as Observable<WfoAttendance[]>;
  }

  addWfoDate(wfoAttendance: WfoAttendance) {

    const wfoDateToCreate = {
      username: wfoAttendance.username,
      year: wfoAttendance.year,
      day: wfoAttendance.day,
      month: wfoAttendance.month
    };

    //addDoc returns a promise, but we need Observable so converting the promise to observable
    const promise = addDoc(this.wfoAttendanceCollection,wfoDateToCreate)
      .then(
        (response) => response.id
      );

    return from(promise);
  }

  removeWfoDate(wfoDateId: string): Observable<void> {
    //To delete from firebase need to create the doc path
    const docRef = doc(this.firestore, 'wfo-attendance/' + wfoDateId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
