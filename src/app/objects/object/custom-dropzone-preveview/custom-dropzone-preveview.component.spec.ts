import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDropzonePreveviewComponent } from './custom-dropzone-preveview.component';

describe('CustomDropzonePreveviewComponent', () => {
  let component: CustomDropzonePreveviewComponent;
  let fixture: ComponentFixture<CustomDropzonePreveviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDropzonePreveviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDropzonePreveviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
