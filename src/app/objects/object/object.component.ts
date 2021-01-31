import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ObjectsService } from 'src/app/services/objects.service';



@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {

  formGroup = null;

  subject$: Observable<any>;
  subject: any = null;
  objects$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private objectService: ObjectsService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: [''],
      type: [''],
      objects: this.formBuilder.array([])
    });
  }

  get objectsCtrl(): any {
    return this.formGroup.get('objects');
  }

  getLinkCtrl(i: number): any {
    return this.objectsCtrl.controls[i].predicate;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pid = params.get('pid');
      if (pid != null) {
        this.getsubjects(pid);
      }
    });
  }

  private getsubjects(pid): void {
    // get subjects
    this.subject$ = this.objectService.read(pid)
      .pipe(
        tap(result => {
          this.subject = result;
          if (this.subject.metadata.objects == null) {
            this.subject.metadata.objects = [];
          }
          this.formGroup.get('objects').clear();
          for (const link of this.subject.metadata.objects) {
            this.formGroup.get('objects').push(this.formBuilder.group({
              $ref: [link.$ref],
              predicate: [link.predicate]
            }));
          }
          this.formGroup.setValue(result.metadata);
          return result;
        })
      );

  }

  update(): void {
    if (this.formGroup.valid) {
      const pid = this.subject.id;
      this.subject.metadata = this.formGroup.value;
      this.objectService.update(this.subject).subscribe((subject: any) => {
        this.subject = subject;
        if (this.subject.metadata.objects == null) {
          this.subject.metadata.objects = [];
        }
        this.formGroup.setValue(subject.metadata);
      });
    }
  }

  cancel(): void {
  }

  isDropAllowed = (object: any) => {
    const doesNotExists = !this.subject.metadata.objects.some(
      doc => this.objectService.extractIDFromRef(doc.$ref) === object.id
    );
    const notSameAssubject = object.id !== this.subject.id;
    return 'objects' ? doesNotExists && notSameAssubject : false;
  }

  onObjectDrop($event): void {
    const object = $event.dragData;
    this.formGroup.get('objects').push(this.formBuilder.group({
      $ref: [`https://coons.io/api/objects/${object.id}`],
      predicate: ['unknown']
    }));
    this.update();
  }
}
