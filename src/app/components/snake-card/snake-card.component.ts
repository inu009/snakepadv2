import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Snake } from 'src/assets/ultilities/models/snake.model';

@Component({
  selector: 'app-snake-card',
  templateUrl: './snake-card.component.html',
  styleUrls: ['./snake-card.component.css'],
})
export class SnakeCardComponent implements OnInit {
  @Input() snake!: Snake;

  @Output() buttonClick = new EventEmitter();

  ngOnInit() {}

  onClick() {
    this.buttonClick.emit(this.snake);
  }
}
