import { Component, OnInit } from '@angular/core';
import { Snake } from 'src/assets/ultilities/models/snake.model';
import { SnakeService } from 'src/assets/ultilities/services/snake.service';

@Component({
  selector: 'app-snake-card-container',
  templateUrl: './snake-card-container.component.html',
  styleUrls: ['./snake-card-container.component.css'],
})
export class SnakeCardContainerComponent implements OnInit {
  snakes: Snake[] = [];

  constructor(private snakeService: SnakeService) {}

  ngOnInit() {
    this.snakeService
      .fetchSnakes()
      .subscribe((snakes) => (this.snakes = snakes));
  }
}
