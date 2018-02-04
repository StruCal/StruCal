import { Component } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { View3dService } from './view3d/view3d.service';
import { StructureService } from './services/structure.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'app';

  constructor(private structureService: StructureService) { }
  ngAfterViewInit(): void {
    this.structureService.start();
  }
  ngOnInit(): void {

  }
}
