import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FileWithMetadata } from '../classes/file-with-metadata';

@Injectable({
  providedIn: 'root'
})
export class ObjectsFilesService {
  prefixURL = '/api/objects';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/octet-stream'
    })
  };

  readAll(id: string): Observable<any> {
    return this.http.get(`${this.prefixURL}/${id}/files`).pipe(
      map((files: any) => files.entries),
      map(files => {
        return files.map(f => {
          const newF = new FileWithMetadata([], f.key, { type: f.mimetype });
          newF.metadata = f.metadata;
          return newF;
        });
      })
    );
  }

  createWithContent(id: string, file: FileWithMetadata): Observable<any> {
    return this.create(id, file).pipe(
      switchMap(() => {
        return this.updateContent(id, file);
      }),
      switchMap(() => {
        return this.commit(id, file);
      })
    );
  }

  create(id: string, file: FileWithMetadata): Observable<any> {
    if (file.metadata == null) {
      file.metadata = {
        key: file.name,
        title: file.name.split('.')[0]
      };
    }
    return this.http.post(
      `${this.prefixURL}/${id}/files`,
      [file.metadata]
    );
  }

  // update(id: string, file: FileWithMetadata): Observable<any> {
  //   const fileName = file.name;
  //   return this.http.post(
  //     `${this.prefixURL}/${id}/files/${fileName}`,
  //     [{ key: file.name, title: file.name.split('.')[0] }],
  //   );
  // }

  updateContent(id: string, file: FileWithMetadata): Observable<any> {
    const fileName = file.name;
    return this.http.put(
      `${this.prefixURL}/${id}/files/${fileName}/content`,
      file,
      this.httpOptions
    );
  }

  commit(id: string, file: FileWithMetadata): Observable<any> {
    const fileName = file.name;
    return this.http.post(
      `${this.prefixURL}/${id}/files/${fileName}/commit`,
      {}
    );
  }

  downloadURL(id: string, file: FileWithMetadata): string {
    const fileName = file.name;
    return `${this.prefixURL}/${id}/files/${fileName}/content`;
  }

  delete(id: string, file: FileWithMetadata): Observable<any> {
    const fileName = file.name;
    return this.http.delete(
      `${this.prefixURL}/${id}/files/${fileName}`
    );
  }
}
