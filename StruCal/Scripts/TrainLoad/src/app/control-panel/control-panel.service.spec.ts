import { TestBed, inject } from '@angular/core/testing';

import { ControlPanelService } from './control-panel.service';

describe('ControlPanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlPanelService]
    });
  });

  it('should be created', inject([ControlPanelService], (service: ControlPanelService) => {
    expect(service).toBeTruthy();
  }));
});
