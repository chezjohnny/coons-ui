import { Component, Input, OnInit } from '@angular/core';
import { NgxDropzonePreviewComponent } from 'ngx-dropzone';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-dropzone-preview',
  templateUrl: './custom-dropzone-preveview.component.html',
  styleUrls: ['./custom-dropzone-preveview.component.scss'],
  providers: [
    {
      provide: NgxDropzonePreviewComponent,
      useExisting: CustomDropzonePreviewComponent
    }
  ]
})
export class CustomDropzonePreviewComponent extends NgxDropzonePreviewComponent implements OnInit {

  @Input()
  id: string;

  constructor(
    sanitizer: DomSanitizer
  ) {
    super(sanitizer);
  }

  ngOnInit() {
    if (!this.file) {
      console.error('No file to read. Please provide a file using the [file] Input property.');
      return;
    }
  }

  downloadUrl() {
    return `/api/objects/${this.id}/files/${this.file.name}/content`;
  }
  iconClass(): Array<string> {
    if (this.file.type === 'application/pdf') {
      return ['fas', 'file-pdf'];
    }
    if (this.file.type.startsWith('image/')) {
      return ['fas', 'file-image'];
    }
    return ['fas', 'file'];
  }
}
