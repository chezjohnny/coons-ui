import { Clipboard } from '@angular/cdk/clipboard';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent {
  @ViewChild('object_autocompete') objectAutocomplete;

  @Input()
  links: Array<string>;

  @Input()
  readOnly = false;

  @Input()
  id: string;

  @Output() addItem = new EventEmitter<string>();
  @Output() removeItem = new EventEmitter<string>();
  @Output() updatePredicate = new EventEmitter<{object, predicate}>();


  isLoading = false;

  currentPredicate: string;

  autocompleteValues = [];

  autocompletePredicates = [];

  constructor(private objectService: ObjectsService, private clipboard: Clipboard) {}

  onChangeLinkSearch(val: string) {
    this.objectService
      .search(`metadata.name:*${val}* NOT id:${this.id}`)
      .pipe(
        distinctUntilChanged(),
        tap((results) => {
          this.isLoading = true;
          if (results.hits.hits) {
            this.autocompleteValues = results.hits.hits.map((hit) => {
              return { ...hit.metadata, id: hit.id };
            });
          }
        })
      )
      .subscribe(() => (this.isLoading = false));
  }

  selectLinkEvent(obj: any) {
    this.addItem.emit(obj.id);
    this.objectAutocomplete.clear();
  }

  remove(obj: any) {
    this.removeItem.emit(obj.id);
  }

  onChangePredicateSearch(val: string) {
    this.currentPredicate = val;
    this.objectService
      .search(`metadata.objects.predicate:*${val}*`)
      .pipe(
        distinctUntilChanged(),
        tap((results) => {
          this.isLoading = true;
          if (results.aggregations.predicate) {
            const buckets = results.aggregations.predicate.buckets;
            this.autocompletePredicates = buckets.map((bucket) => {
              return bucket.label;
            });
          }
        })
      )
      .subscribe(() => (this.isLoading = false));
  }

  selectPredicateEvent(predicate: string) {
    this.currentPredicate = predicate;
  }

  markdownToClipboard(link, object) {
    const url = link.$ref.replace('https://coons.io/api/objects', `/object`);
    this.clipboard.copy(`[${object.metadata.name} (${link.predicate})](${url})`);
  }

  savePredicate(object) {
    this.updatePredicate.emit({object, predicate: this.currentPredicate});
  }
}
