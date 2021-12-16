import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private messaging: AngularFireMessaging) { }

  async permission() {
    await this.messaging.requestPermission.pipe(mergeMapTo(this.messaging.tokenChanges)).pipe(take(1)).toPromise()
  }
}

@Injectable({
  providedIn: 'root'
})
export class DBService {
  constructor(public db: AngularFirestore){}

  doc = {
    get$: (p) => {
      return this.db.doc(p?.d||p?.doc)?.valueChanges({idField:'id'})?.pipe(take(1))
    },
    get: async (p) => {
      return await this.doc.get$(p).toPromise()
    },
    update: async (p:any) => {
      return await this.db.collection(p.c).doc(p.d).set(p.set, {merge: true})
    }
  }
}