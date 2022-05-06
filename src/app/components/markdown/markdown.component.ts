import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as EasyMDE from 'easymde';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements AfterViewInit {
  @ViewChild('textarea', { static: false }) textarea: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor() {
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('mardown', markdown);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('sql', sql);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('yaml', yaml);
  }

  @Input()
  set data(value: string) {
    this._data = value;
    if (this.mde && (this.mde.value() != value)) {
      this.mde.value(value);
      // this.content = marked(this._data);
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
    this.mde = new EasyMDE({
      spellChecker: false,
      promptURLs: true,
      initialValue: this._data,
      renderingConfig: {
        codeSyntaxHighlighting: true,
        hljs
      },
      // toolbar: [
      //   'bold',
      //   'italic',
      //   'heading',
      //   '|',
      //   'unordered-list',
      //   'ordered-list',
      //   '|',
      //   'link',
      //   'image',
      //   'table',
      //   'code',
      //   '|',
      //   'preview',
      //   'fullscreen',
      //   'side-by-side',
      //   '|',
      //   'guide',
      // ],
      element: this.textarea.nativeElement,
      status: false,
    });
    setTimeout(() => {
      this.content = this.mde.markdown(this._data);
    });
    this.mde.codemirror.on('change', () => {
      this.dataChange.emit(this.mde.value());
    });
  }
}
