import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObjectLinkComponent } from './object-link.component';


describe('ObjectObjectLinkComponent', () => {
  let component: ObjectLinkComponent;
  let fixture: ComponentFixture<ObjectLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
