import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjectComponent } from './objects/object/object.component';
import { EditableModule } from '@ngneat/edit-in-place';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './objects/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload, faGripVertical, faLongArrowAltRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { StickyComponent } from './objects/sticky/sticky.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { ObjectLinkComponent } from './objects/object/object-link.component';
import { FilesComponent } from './objects/object/files.component';
import { ObjectCardComponent } from './objects/object/object-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjectComponent,
    SearchComponent,
    StickyComponent,
    ObjectLinkComponent,
    FilesComponent,
    ObjectCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditableModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxDropzoneModule,
    NgDragDropModule.forRoot()

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faDownload, faSearch, faLongArrowAltRight, faGripVertical);
  }
 }
