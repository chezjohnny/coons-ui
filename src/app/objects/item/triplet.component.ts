import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap, throttleTime } from 'rxjs/operators';
import { ObjectsService } from 'src/app/services/objects.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-triplet',
  templateUrl: './triplet.component.html',
  styleUrls: ['./triplet.component.scss'],
})
export class TripletComponent implements OnInit, OnChanges, OnDestroy {
  keyword = 'name';

  @Input()
  readOnly = true;

  @Input()
  id: string;

  typeIsLoading = false;

  autocompleteType = [];

  formGroup = null;

  subject: any = null;

  isContentEditing = false;

  private _pinned = false;

  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private objectService: ObjectsService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.formGroup = this.formBuilder.group({
      name: [''],
      type: [''],
      content: [''],
      objects: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const pid = params.get('pid');
      if (pid != null) {
        this.id = pid;
        this.getsubjects(this.id);
      }
      const action = params.get('action');
      if (action === 'edit') {
        this.readOnly = false;
      } else {
        this.readOnly = true;
        this.subscription.add(
          this.userService.editMode$.subscribe(
            (mode) => (this.readOnly = !mode)
          )
        );
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id && changes.id.currentValue) {
      this.id = changes.id.currentValue;
      this.getsubjects(this.id);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get pinned(): boolean {
    if (
      this.subject &&
      this.subject.metadata &&
      !this.subject.metadata.content
    ) {
      return false;
    }
    return this._pinned;
  }

  get title(): string {
    const content = this.subject.metadata.content;
    if (content) {
      const res = content.match(/^#\s+(.+)\n/);
      if (res) {
        return res[1];
      }
    }
    if (this.subject && this.subject.metadata && this.subject.metadata.name) {
      return this.subject.metadata.name;
    }
  }

  get content(): string {
    const content = this.subject.metadata.content;
    if (content) {
      return content.replace(/^#\s+(.+)\n/, '');
    }
  }

  get objectsCtrl(): any {
    return this.formGroup.get('objects');
  }

  togglePinned() {
    this._pinned = !this._pinned;
  }

  onChangeSearch(val: string) {
    this.objectService
      .search(`metadata.type:*${val}*`)
      .pipe(
        distinctUntilChanged(),
        tap((results) => {
          this.typeIsLoading = true;
          if (results.aggregations.type) {
            const buckets = results.aggregations.type.buckets;
            this.autocompleteType = buckets.map((bucket) => bucket.label);
          }
        })
      )
      .subscribe(() => (this.typeIsLoading = false));
  }

  getLinkCtrl(i: number): any {
    return this.objectsCtrl.controls[i].predicate;
  }

  setDefaultContent() {
    if (
      this.subject.metadata.content === null ||
      this.subject.metadata.content === ''
    ) {
      this.subject.metadata.content = `[comment]: <> (Please add you page content here)`;
    }
  }

  private getsubjects(pid): void {
    // get subjects
    this.objectService
      .read(pid)
      .pipe(
        tap((result) => {
          this.subject = result;
          if (this.subject.metadata.objects == null) {
            this.subject.metadata.objects = [];
          }
          if (this.subject.metadata.content == null) {
            this.subject.metadata.content = '';
          }
          this.formGroup.get('objects').clear();
          for (const link of this.subject.metadata.objects) {
            this.formGroup.get('objects').push(
              this.formBuilder.group({
                $ref: [link.$ref],
                predicate: [link.predicate],
              })
            );
          }
          this.formGroup.setValue(result.metadata);
          return result;
        })
      )
      .subscribe((result) => {
        this.subject = result;
      });
  }

  update(): void {
    if (this.formGroup.valid && this.formGroup.dirty) {
      const pid = this.subject.id;
      this.subject.metadata = this.formGroup.value;
      this.formGroup.markAsPristine();
      this.objectService.update(this.subject).subscribe((subject: any) => {
        if (this.subject.metadata.objects == null) {
          this.subject.metadata.objects = [];
        }
        this.formGroup.setValue(this.subject.metadata);
      });
    }
  }

  updateContent(value) {
    this.formGroup.get('content').setValue(value);
    this.formGroup.get('content').markAsDirty();
  }

  cancel(): void {
    this.formGroup.setValue(this.subject.metadata);
    this.formGroup.markAsPristine();
  }

  addLink(objectId): void {
    this.formGroup.markAsDirty();
    this.formGroup.get('objects').push(
      this.formBuilder.group({
        $ref: [`https://coons.io/api/objects/${objectId}`],
        predicate: ['unknown'],
      })
    );
    this.update();
  }

  removeLink(objectId): void {
    this.formGroup.markAsDirty();
    this.formGroup
      .get('objects')
      .removeAt(
        this.subject.metadata.objects.findIndex((obj) => obj.id === objectId)
      );
    this.update();
  }

  updatePredicate(data) {
    const index = this.subject.metadata.objects.findIndex(
      (obj) => obj == data.object
    );
    if (index > -1) {
      const toUpdate = this.formGroup.get('objects').controls[index];
      toUpdate.markAsDirty();
      toUpdate.controls.predicate.setValue(data.predicate);
      this.update();
    }
  }
}
