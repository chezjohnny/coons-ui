import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObjectsService } from './services/objects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private objectSerice: ObjectsService) {}

  search(query: string): void {
    this.router.navigate([''], {queryParams: {q: query ? query : ''}});
  }

  createRecord(): void {
    this.objectSerice.create().subscribe((doc: any) => this.router.navigate(['object', doc.id]));
  }
}
