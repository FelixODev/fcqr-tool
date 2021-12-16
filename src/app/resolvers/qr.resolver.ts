import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DBService } from '../modules/fire/fire.service';

@Injectable({
  providedIn: 'root'
})
export class QrResolver implements Resolve<any> {
  
  constructor(public db: DBService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const d = route.params.qr_id;
    const qrs = this.db.doc.get$({doc:'qrs/'+d});
    return qrs;
    return of(d);
  }
}
