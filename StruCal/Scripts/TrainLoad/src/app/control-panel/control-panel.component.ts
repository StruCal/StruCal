import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { View3dService } from '../view3d/view3d.service';
import { ControlPanelService } from '../services/control-panel.service';
import { StatusBarService } from '../services/status-bar.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements AfterViewInit {

  valid = false;
  dirty = true;
  error = false;
  progress = false;

  constructor(private controlPanelService: ControlPanelService,
    private statusBarService: StatusBarService,
    private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.statusBarService.dirty$.subscribe(e => this.dirty = e);
    this.statusBarService.valid$.subscribe(e => this.valid = e);
    this.statusBarService.error$.subscribe(e => this.error = e);
    this.statusBarService.progress$.subscribe(e => this.progress = e);

    this.cdr.detectChanges();
  }

  calculate() {
    this.controlPanelService.calculate();

  }

}
