import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { section1Input } from '../modal-section1/Input/section1/section1Input';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() inputs;
  @Output() change = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.change.emit();
  }

}
