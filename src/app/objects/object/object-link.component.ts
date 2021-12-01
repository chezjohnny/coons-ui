import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-object-link',
  templateUrl: './object-link.component.html'
})
export class ObjectLinkComponent implements OnChanges {

  @Input()
  objectLink;

  object$: Observable<any>;

  constructor(private objectService: ObjectsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.objectLink &&
      (
        changes.objectLink.firstChange ||
        (changes.objectLink.currentValue.$ref !== changes.objectLink.previousValue.$ref)
      )) {
      this.object$ = this.resolveLinkRef$(this.objectLink.$ref);
    }
  }

  private resolveLinkRef$(ref: any): Observable<any> {
    const id = this.objectService.extractIDFromRef(ref);
    return this.objectService.read(id);
  }
}
