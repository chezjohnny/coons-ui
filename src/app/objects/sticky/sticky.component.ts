import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-sticky',
  templateUrl: './sticky.component.html',
  styleUrls: ['./sticky.component.scss']
})
export class StickyComponent implements OnInit {

  objects: Array<any> = [];

  constructor(private http: HttpClient, private objectsService: ObjectsService) { }

  ngOnInit(): void {
    this.http.get('/api/sticky').pipe(
      switchMap((ids: Array<string> | null) => {
        if (ids == null || ids.length === 0) {
          return of([]);
        }
        const obs = ids.map(id => this.objectsService.read(id));
        return forkJoin(obs);
      }),
      map(res => this.objects = res)
    ).subscribe();
  }

  onItemDrop($event): void {
    const object = $event.dragData;
    this.objects.push(object);
    this.update();
  }

  remove(object: any): void {
    this.objects = this.objects.filter(obj => obj.id !== object.id);
    this.update();
  }

  update(): void {
    const ids = this.objects.map(obj => obj.id);
    this.http.put('/api/sticky', ids).subscribe();
  }

  isDropAllowed = (object: any) => {
    const doesNotExists = !this.objects.some(obj => obj.id === object.id);
    return 'objects' ? doesNotExists : false;
  }

}
