import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Snake } from 'src/assets/ultilities/models/snake.model';
import { SnakeService } from 'src/assets/ultilities/services/snake.service';

@Component({
  selector: 'app-snake-card',
  templateUrl: './snake-card.component.html',
  styleUrls: ['./snake-card.component.css'],
})
export class SnakeCardComponent implements OnInit {
  @Input() snake!: Snake;

  @Output() buttonClick = new EventEmitter();

  lastMeal?: string;
  lastNote?: string;
  mealSize?: string;
  mealFrequency?: string;

  constructor(private snakeService: SnakeService) {}

  ngOnInit() {
    if (this.snake.feedingsDto![Array.length - 1]) {
      this.getLastMeal();
    }
    if (this.snake.notesDto![Array.length - 1]) {
      this.getLastNote();
    }
    if (this.snake.weightsDto![Array.length - 1]) {
      this.mealSize = this.snakeService.getMealSize(this.getLastWeight());
      this.mealFrequency = this.snakeService.getMealFrequency(
        this.getLastWeight()
      );
    }
  }

  onClick() {
    this.buttonClick.emit(this.snake);
  }

  getLastMeal() {
    let lastIndex = this.snake.feedingsDto!.length - 1;
    this.lastMeal = this.snake.feedingsDto![lastIndex].date;
  }

  getLastNote() {
    let lastIndex = this.snake.notesDto!.length - 1;
    this.lastNote = this.snake.notesDto![lastIndex].note;
  }

  getLastWeight() {
    return this.snake.weightsDto![Array.length - 1].weight;
  }
}
