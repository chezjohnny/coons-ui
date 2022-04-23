import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSlash } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ObjectsService } from 'src/app/services/objects.service';
import { BookmarksService } from 'src/app/services/bookmarks.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy, OnInit {
  query$: Observable<string>;

  results = null;

  aggFilters = {};

  currentAgg = 'object_type';

  query = '';

  subscription = new Subscription();

  bookmarkedObjectIds = [];

  aggs = [
    {
      code: 'type',
      name: 'Type',
    },
    {
      code: 'predicate',
      name: 'Relation',
    },
    {
      code: 'object_type',
      name: 'Link Type',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private objectService: ObjectsService,
    private bookmarksService: BookmarksService
  ) {
    this.query$ = this.route.queryParams.pipe(map((p) => (this.query = p.q)));
    this.subscription.add(
      this.query$
        .pipe(
          switchMap((query: string) => {
            query = query ? query : '';
            this.query = query;
            return this.objectService
              .search(query, this.aggFilters)
              .pipe(tap((results) => (this.results = results)));
          })
        )
        .subscribe()
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.bookmarksService.objectIds$.subscribe(ids => this.bookmarkedObjectIds = ids)
    );
    this.bookmarksService.getAll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(query: string): void {
    this.router.navigate(['objects'], {queryParams: {q: query ? query : ''}});
  }

  clearAggFilters(): void {
    this.aggFilters = {};
    this.getObjects();
  }

  hasFilter(term: string, value: string): boolean {
    if (this.aggFilters != null && this.aggFilters[term]) {
      return this.aggFilters[term].includes(value);
    }
    return false;
  }

  toggleFilter(term: string, value: string): void {
    if (
      this.aggFilters != null &&
      this.aggFilters[term] &&
      this.aggFilters[term].includes(value)
    ) {
      this.aggFilters[term] = this.aggFilters[term].filter(
        (v: string) => v !== value
      );
      if (this.aggFilters[term].length === 0) {
        delete this.aggFilters[term];
      }
    } else {
      if (this.aggFilters[term] == null) {
        this.aggFilters[term] = [];
      }
      this.aggFilters[term].push(value);
    }
    this.getObjects();
  }

  selectCurrentAgg(agg): void {
    this.currentAgg = agg;
  }

  getObjects(): void {
    this.objectService
      .search(this.query, this.aggFilters)
      .subscribe((results) => (this.results = results));
  }

  isBookmarked(object): boolean {
    return this.bookmarkedObjectIds.some(id => object.id == id);
  }

  bookmark(value, object) {
    // this.bookmarksService.update([]);
    if (value.currentTarget.checked) {
      this.bookmarksService.update([...this.bookmarkedObjectIds, object.id]);
    } else {
     this.bookmarksService.update(this.bookmarkedObjectIds.filter(id => id !== object.id));
    }
  }
}
