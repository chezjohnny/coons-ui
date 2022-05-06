import { Clipboard } from '@angular/cdk/clipboard';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { ObjectsFilesService } from 'src/app/services/objects-files.service';
import { UserService } from 'src/app/services/user.service';
import { FileWithMetadata } from '../../classes/file-with-metadata';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styles: [
    `
      ngx-dropzone {
        border: 1px solid #a2afb9;
        border-radius: 5px;
      }
    `,
  ],
})
export class FilesComponent implements OnChanges {
  @Input()
  subjectID: string;

  @Input()
  readOnly = false;

  files: FileWithMetadata[] = [];

  acceptMimeTypes: string;

  constructor(
    private objectFilesService: ObjectsFilesService,
    sanitizer: DomSanitizer,
    private clipboard: Clipboard,
    private userService: UserService
  ) {
    sanitizer.bypassSecurityTrustUrl('*');
    const mimeConfig =
      this.userService?.currentUser?.config?.supported_mime_types;
    this.acceptMimeTypes = mimeConfig ? mimeConfig : '*';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.subjectID &&
      (changes.subjectID.firstChange || changes.subjectID !== changes.subjectID)
    ) {
      this.getFiles();
    }
  }

  getFiles(): void {
    this.objectFilesService
      .readAll(this.subjectID)
      .pipe(
        map((files) => {
          for (const f of files) {
            this.files.push(f);
          }
        })
      )
      .subscribe();
  }

  onFilesAdded(event): void {
    this.files.push(...event.addedFiles);
    for (const file of event.addedFiles) {
      this.objectFilesService
        .createWithContent(this.subjectID, file)
        .subscribe();
    }
  }

  getTitle(f: FileWithMetadata): string {
    if (f.metadata && f.metadata.title) {
      return f.metadata.title;
    }
    return f.name.split('.')[0];
  }

  downloadURL(f: FileWithMetadata): string {
    return this.objectFilesService.downloadURL(this.subjectID, f);
  }

  remove(file): any {
    return this.objectFilesService
      .delete(this.subjectID, file)
      .subscribe(() => (this.files = this.files.filter((f) => f !== file)));
  }

  markdownToClipboard(file) {
    console.log(file.type);
    const url = encodeURI(this.downloadURL(file));
    if (file.type.startsWith('image/')) {
      this.clipboard.copy(`
<figure>
<img src="${url}">
<figcaption>${file.name}</figcaption>
</figure>
`);
    } else {
      this.clipboard.copy(`[${file.name}](${url})`);
    }
  }
}
