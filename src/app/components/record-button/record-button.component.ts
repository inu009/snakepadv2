import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-record-button',
  templateUrl: './record-button.component.html',
  styleUrls: ['./record-button.component.css'],
})
export class RecordButtonComponent {
  @Input() text!: string;
  @Output() buttonClick = new EventEmitter();

  onClick() {
    this.buttonClick.emit();
  }
}
