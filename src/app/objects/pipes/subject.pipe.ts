import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjectsService } from 'src/app/services/objects.service';

@Pipe({
  name: 'subject'
})
export class SubjectPipe implements PipeTransform {
  constructor(private objectService: ObjectsService) { }

  transform(value: any): Observable<any> {
    return this.resolveLinkRef$(value);
  }

  private resolveLinkRef$(ref: any): Observable<any> {
    const id = this.objectService.extractIDFromRef(ref);
    return this.objectService.read(id);
  }

}
