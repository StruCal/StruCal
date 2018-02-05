import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StatusBarService } from '../services/status-bar.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit, AfterViewInit {
  

  valid = false;
  dirty = true;
  error= false;
  progress = false;
  message = '';

  constructor(private statusBarService: StatusBarService,
  private cdr: ChangeDetectorRef) {
    
  }

  ngAfterViewInit(): void {
    this.statusBarService.dirty$.subscribe(e => this.dirty = e);
    this.statusBarService.valid$.subscribe(e => this.valid = e);
    this.statusBarService.error$.subscribe(e => this.error = e);
    this.statusBarService.progress$.subscribe(e => this.progress = e);
    this.statusBarService.msg$.subscribe(e => this.message = e);

    this.cdr.detectChanges();
  }

  ngOnInit() {
  }

}
