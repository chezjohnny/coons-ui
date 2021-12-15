import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faDownload,
  faLongArrowAltRight,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { EditableModule } from '@ngneat/edit-in-place';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgDragDropModule } from 'ng-drag-drop';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { FilesComponent } from './objects/object/files.component';
import { ObjectCardComponent } from './objects/object/object-card.component';
import { ObjectLinkComponent } from './objects/object/object-link.component';
import { ObjectComponent } from './objects/object/object.component';
import { SearchComponent } from './objects/search/search.component';
import { StickyComponent } from './objects/sticky/sticky.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjectComponent,
    SearchComponent,
    StickyComponent,
    ObjectLinkComponent,
    FilesComponent,
    ObjectCardComponent,
    MarkdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditableModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxDropzoneModule,
    NgDragDropModule.forRoot(),
    LoadingBarHttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faDownload, faLongArrowAltRight, faCheckCircle, faTimesCircle);
  }
}
