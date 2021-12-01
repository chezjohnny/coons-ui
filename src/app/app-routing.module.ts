import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectComponent } from './objects/object/object.component';
import { SearchComponent } from './objects/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'object/:pid',
    component: ObjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
