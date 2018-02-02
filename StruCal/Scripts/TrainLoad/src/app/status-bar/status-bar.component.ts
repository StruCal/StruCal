import { Component, OnInit } from '@angular/core';
import { StatusBarService } from '../services/status-bar.service';

@Component({
  selector: 'status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  valid: boolean;
  dirty: boolean;
  error: boolean;
  progress: boolean;
  message: string;

  constructor(private statusBarService: StatusBarService) {
    statusBarService.dirty$.subscribe(e => this.dirty = e);
    statusBarService.valid$.subscribe(e => this.valid = e);
    statusBarService.error$.subscribe(e => this.error = e);
    statusBarService.progress$.subscribe(e => this.progress = e);
    statusBarService.msg$.subscribe(e => this.message = e);
  }

  ngOnInit() {
  }

}
