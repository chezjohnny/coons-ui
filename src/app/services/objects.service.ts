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

  search(query, filters = null): Observable<any> {
    let queryFilters = '';
    if (filters != null) {
      for (const [key, value] of Object.entries(filters)) {
        queryFilters += `&${key}=${value}`;
      }
    }
    return this.http.get(`/api/objects?size=10&q=${query}${queryFilters}`);
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
