import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  progress=true;

  constructor() { }

  ngOnInit() {
  }

}
