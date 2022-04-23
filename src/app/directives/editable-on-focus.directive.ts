import { Directive, HostListener } from '@angular/core';
import { EditableComponent } from '@ngneat/edit-in-place';

@Directive({
  selector: '[appEditableOnFocus]'
})
export class EditableOnFocusDirective {

  constructor(private readonly editable: EditableComponent) { }

  @HostListener('focusin')
  onEnter(): void {
    this.editable.displayEditMode();
  }

  // @HostListener('focusout')
  // onLeave(): void {
  //   console.log('leave');
  //   // this.editable.saveEdit();
  // }

  // @HostListener('keyup.escape')
  // onEscape(): void {
  //   console.log('escape');
  //   this.editable.cancelEdit();
  // }
}
