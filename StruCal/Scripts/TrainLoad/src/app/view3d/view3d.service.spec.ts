import { TestBed, inject } from '@angular/core/testing';

import { View3dserviceService } from './view3dservice.service';

describe('View3dserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [View3dserviceService]
    });
  });

  it('should be created', inject([View3dserviceService], (service: View3dserviceService) => {
    expect(service).toBeTruthy();
  }));
});
