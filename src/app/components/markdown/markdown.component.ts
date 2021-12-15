import { AfterViewInit, Component, ElementRef, EventEmitter, Input,  OnChanges,  Output,  ViewChild } from '@angular/core';
import * as SimpleMDE from 'simplemde';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements AfterViewInit {
  @ViewChild('textarea', { static: false }) textarea: ElementRef<HTMLInputElement> = {} as ElementRef;

  @Input()
  set data(value: string) {
    this._data = value;
    if (this.mde && (this.mde.value() != value)) {
      this.mde.value(value);
      this.content = this.mde.markdown(this._data);
    }
  };

  @Input()
  readOnly = false;

  private _data = '';
  content = '';
  @Output() dataChange = new EventEmitter<string>();

  mde: any;

  /**
   * Markdown editor initialization and listen for changes to update the model
   * value.
   */
  ngAfterViewInit(): void {
    this.mde = new SimpleMDE({
      spellChecker: false,
      promptURLs: true,
      initialValue: this._data,
      toolbar: [
        'bold',
        'italic',
        'heading',
        '|',
        'unordered-list',
        'ordered-list',
        '|',
        'link',
        'image',
        '|',
        'preview',
        'fullscreen',
        'side-by-side',
        '|',
        'guide',
      ],
      element: this.textarea.nativeElement,
      status: false,
    });
    setTimeout(() => {
      console.log(this.mde);
      this.content = this.mde.markdown(this._data);
    });
    this.mde.codemirror.on('change', () => {
      this.dataChange.emit(this.mde.value());
    });
  }
}
