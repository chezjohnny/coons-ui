import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ObjectsService } from 'src/app/services/objects.service';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit, OnDestroy{

  subscription = new Subscription();

  bookmarkedObject = [];


  constructor(
    private bookmarksService: BookmarksService,
    private objectsService: ObjectsService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.bookmarksService.objectIds$.pipe(
        switchMap((ids: Array<string> | null) => {
          const obs = ids.map(id => this.objectsService.read(id));
          return forkJoin(obs);
        }),
      ).subscribe(objects => {
        this.bookmarkedObject = objects;
      })
    );
    this.bookmarksService.getAll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    const ret = moveItemInArray(this.bookmarkedObject, event.previousIndex, event.currentIndex);
    this.bookmarksService.update(this.bookmarkedObject.map(obj => obj.id));
  }

  remove(object) {
     this.bookmarksService.update(this.bookmarkedObject.filter(obj => obj.id !== object.id).map(obj => obj.id));
  }
}
