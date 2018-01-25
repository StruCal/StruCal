import { Component } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { View3dService } from './view3d/view3d.service';
import { ControlPanelService } from './control-panel/control-panel.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'app';

  constructor(private messageService: MessageService) { }
  ngAfterViewInit(): void {
    this.messageService.start();
  }
  ngOnInit(): void {

  }
}
