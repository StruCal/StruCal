import { Component, OnInit } from '@angular/core';
import { StructureService } from '../services/structure.service';


@Component({
  selector: 'details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css']
})
export class DetailsComponentComponent implements OnInit {

  public span: string;

  constructor(private structureService: StructureService) {

  }


  ngOnInit() {
    this.structureService.span$.subscribe(e => this.span = `${e.lengths.length}x${e.lengths[0]}`);
  }

}
