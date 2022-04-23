import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarkComponent } from './objects/bookmark/bookmark.component';
import { TripletComponent } from './objects/item/triplet.component';
import { ListComponent } from './objects/list/list.component';
import { SearchComponent } from './objects/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'objects',
    component: SearchComponent
  },
  {
    path: 'object/:pid',
    component: TripletComponent
  },
  {
    path: 'object/:pid/:action',
    component: TripletComponent
  },
  {
    path: 'bookmark',
    component: BookmarkComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
