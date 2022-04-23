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

  createRecord($event): void {
    $event.preventDefault();
    this.objectSerice.create().subscribe((doc: any) => this.router.navigate(['/object', doc.id, 'edit']));
  }
}
