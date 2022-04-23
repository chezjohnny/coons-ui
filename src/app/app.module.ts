import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faBookmark,
  faCheckCircle,
  faCopy,
  faDownload,
  faFile,
  faBars,
  faFileImage,
  faFilePdf,
  faHome,
  faLongArrowAltRight,
  faPlus,
  faSearch,
  faThumbtack,
  faTimesCircle,
  faTrash,
  faPen,
  faFloppyDisk
} from '@fortawesome/free-solid-svg-icons';
import { EditableModule } from '@ngneat/edit-in-place';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { FilesComponent } from './objects/item/files.component';
import { SearchComponent } from './objects/search/search.component';
import { EditableOnFocusDirective } from './directives/editable-on-focus.directive';
import { SaveOnFocusDirective } from './directives/save-on-focus.directive';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ListComponent } from './objects/list/list.component';
import { TripletComponent } from './objects/item/triplet.component';
import { BookmarkComponent } from './objects/bookmark/bookmark.component';
import { LinksComponent } from './objects/item/links/links.component';
import { SubjectPipe } from './objects/pipes/subject.pipe';
import { AutofocusDirective } from './directives/autofocus.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {ClipboardModule} from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FilesComponent,
    MarkdownComponent,
    EditableOnFocusDirective,
    SaveOnFocusDirective,
    ListComponent,
    TripletComponent,
    BookmarkComponent,
    LinksComponent,
    SubjectPipe,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditableModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    FontAwesomeModule,
    DragDropModule,
    ClipboardModule,
    LoadingBarHttpClientModule,
    AutocompleteLibModule
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faHome, faCopy, faBars, faPlus, faTrash,faSearch, faBookmark, faDownload, faLongArrowAltRight, faCheckCircle, faTimesCircle, faFilePdf, faFileImage, faFile, faThumbtack, faPen, faFloppyDisk);
  }
}
