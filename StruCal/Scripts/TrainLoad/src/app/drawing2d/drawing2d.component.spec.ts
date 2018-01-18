import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Drawing2dComponent } from './drawing2d.component';

describe('Drawing2dComponent', () => {
  let component: Drawing2dComponent;
  let fixture: ComponentFixture<Drawing2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Drawing2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Drawing2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
