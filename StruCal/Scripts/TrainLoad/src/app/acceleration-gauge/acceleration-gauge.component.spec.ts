import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccelerationGaugeComponent } from './acceleration-gauge.component';

describe('AccelerationGaugeComponent', () => {
  let component: AccelerationGaugeComponent;
  let fixture: ComponentFixture<AccelerationGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccelerationGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccelerationGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
