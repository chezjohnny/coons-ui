import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookmarksService } from 'src/app/services/bookmarks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  objectIds = [];
  subscription = new Subscription();

  constructor(
    private bookmarksService: BookmarksService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.bookmarksService.objectIds$
        .subscribe(ids => this.objectIds = ids)
    );
    this.bookmarksService.getAll();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
