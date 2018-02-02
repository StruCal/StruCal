import { Component, OnInit } from '@angular/core';
import { StructureService } from '../services/structure.service';

@Component({
  selector: 'details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css']
})
export class DetailsComponentComponent implements OnInit {

  constructor(private structureService: StructureService) {

   }

  ngOnInit() {
  }

}
