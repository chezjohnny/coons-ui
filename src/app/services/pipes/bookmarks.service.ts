import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  constructor(private http: HttpClient) {}
  prefixURL = '/api/sticky';

  objectIds$ = new BehaviorSubject([]);

  getAll() {
    this.http.get(`${this.prefixURL}`).pipe(
      tap((ids: Array<string> | null) => {
        if (ids == null || ids.length === 0) {
          this.objectIds$.next([]);
        } else {
          this.objectIds$.next(ids);
        }
      }),
    ).subscribe();
  }

  update(ids) {
    this.http.put(`${this.prefixURL}`, ids).subscribe(res => this.objectIds$.next(ids));
  }
}
