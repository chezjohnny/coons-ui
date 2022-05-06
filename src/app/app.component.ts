import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ObjectsService } from './services/objects.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private router: Router, private objectSerice: ObjectsService, private userService: UserService) {}
  authorized = false;
  editMode = false;
  ngOnInit(): void {
      this.userService.read().pipe(
        tap(user => this.authorized = true ? user?.email : false)
      ).subscribe();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.userService.setEditMode(this.editMode);
  }

  createRecord($event): void {
    $event.preventDefault();
    this.objectSerice.create().subscribe((doc: any) => this.router.navigate(['/object', doc.id, 'edit']));
  }
}
