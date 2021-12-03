import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  query$: Observable<string>;
  results = null;
  aggFilters = {};
  currentAgg = 'object_type';
  query = '';
  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private objectService: ObjectsService
  ) {
    this.query$ = this.route.queryParams.pipe(map((p) => (this.query = p.q)));
    this.subscription.add(this.query$.pipe(
      switchMap((query: string) => {
        query = query ? query : '';
        this.query = query;
        return this.objectService
          .search(query, this.aggFilters)
          .pipe(tap((results) => (this.results = results)));
      })
    ).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
}
