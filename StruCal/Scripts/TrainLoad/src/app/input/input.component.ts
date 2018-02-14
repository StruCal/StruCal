import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { section1Input } from '../modal-section1/Input/section1/section1Input';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @ViewChild('form')
  public form: NgForm;

  @Input() inputs;
  @Output() changeEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.changeEvent.emit(this.form.invalid);
  }


}
