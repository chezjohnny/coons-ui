import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  constructor(private http: HttpClient) { }
  prefixURL = '/api/objects';

  defaultObject = {
    metadata: {
      name: 'changeit',
      type: 'unknown'
    }
  };

  search(query): Observable<any> {
    return this.http.get(`/api/objects?q=${query}`);
  }

  read(pid): Observable<any> {
    return this.http.get(`${this.prefixURL}/${pid}`);
  }

  create(data?: (null | any)): Observable<any> {
    if (data == null) {
      data = this.defaultObject;
    }
    return this.http.post(
      this.prefixURL,
      data
    );
  }

  update(data): Observable<any> {
    return this.http.put(
      `${this.prefixURL}/${data.id}`,
      data,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  extractIDFromRef(ref: string): string {
    return ref.split('/').slice(-1)[0];
  }

  // delete(pid): Observable<any> { }

}
