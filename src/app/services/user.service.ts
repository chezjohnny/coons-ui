import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  prefixURL = '/api';
  currentUser: any;

  get editMode$ (): Observable<boolean> {
    return this._editMode.asObservable();
  }

  _editMode = new BehaviorSubject(false);


  read(): Observable<any> {
    return this.http.get(`${this.prefixURL}/me`).pipe(
      tap(user => this.currentUser = user)
    );
  }

  setEditMode(mode: boolean) {
    this._editMode.next(mode);
  }
}
