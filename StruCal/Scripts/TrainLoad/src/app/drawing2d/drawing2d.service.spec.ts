import { TestBed, inject } from '@angular/core/testing';

import { Drawing2dService } from './drawing2d.service';

describe('Drawing2dService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Drawing2dService]
    });
  });

  it('should be created', inject([Drawing2dService], (service: Drawing2dService) => {
    expect(service).toBeTruthy();
  }));
});
