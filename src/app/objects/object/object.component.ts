import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ObjectsService } from 'src/app/services/objects.service';



@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {
  
  formGroup = null;
  
  subject: any = null;
  
  constructor(
    private route: ActivatedRoute,
    private objectService: ObjectsService,
    private formBuilder: FormBuilder
    ) {
      this.formGroup = this.formBuilder.group({
        name: [''],
        type: [''],
        content: [''],
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
      this.objectService.read(pid)
      .pipe(
        tap(result => {
          this.subject = result;
          if (this.subject.metadata.objects == null) {
            this.subject.metadata.objects = [];
          }
          if (this.subject.metadata.content === null || this.subject.metadata.content === '' ) {
            this.subject.metadata.content = 'Change it';
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
        ).subscribe(result => {
          this.subject = result
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
        console.log('update Content');
        this.formGroup.get('content').setValue(value);
        this.formGroup.get('content').markAsDirty();
      }
      
      cancel(): void {
        this.formGroup.setValue(this.subject.metadata);
        this.formGroup.markAsPristine();
      }
      
      isDropAllowed = (object: any) => {
        const doesNotExists = !this.subject.metadata.objects.some(
          doc => this.objectService.extractIDFromRef(doc.$ref) === object.id
          );
          const notSameAssubject = object.id !== this.subject.id;
          console.log(doesNotExists, notSameAssubject);
          return 'objects' ? doesNotExists && notSameAssubject : false;
        }
        
        onObjectDrop($event): void {
          const object = $event.dragData;
          this.formGroup.markAsDirty();
          this.formGroup.get('objects').push(this.formBuilder.group({
            $ref: [`https://coons.io/api/objects/${object.id}`],
            predicate: ['unknown']
          }));
          this.update();
        }
      }
      