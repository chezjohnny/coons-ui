import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ObjectsService } from 'src/app/services/objects.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  query$: Observable<string>;
  results$: Observable<any>;

  constructor(private route: ActivatedRoute, private objectService: ObjectsService) {
    this.query$ = this.route.queryParams.pipe(
      map(p => p.q)
    );

    this.results$ = this.query$.pipe(
      switchMap((query: string) => {
        query = query ? query : '';
        return this.objectService.search(query);
      })
    );
  }
}
