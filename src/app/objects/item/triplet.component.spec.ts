import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripletComponent } from './triplet.component';

describe('TripletComponent', () => {
  let component: TripletComponent;
  let fixture: ComponentFixture<TripletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
