import { Directive, HostListener } from '@angular/core';
import { EditableComponent } from '@ngneat/edit-in-place';

@Directive({
  selector: '[appSaveOnFocus]'
})
export class SaveOnFocusDirective {

  constructor(private readonly editable: EditableComponent) { }

  @HostListener('focusout')
  onLeave(): void {
    this.editable.saveEdit();
  }
  
  @HostListener('keyup.escape')
  onEscape(): void {
    this.editable.cancelEdit();
  }

  @HostListener('keyup.enter')
  onReturn(): void {
    this.editable.saveEdit();
  }
}
