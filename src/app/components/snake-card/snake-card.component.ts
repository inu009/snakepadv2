import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feeding } from 'src/assets/ultilities/models/feeding.model';
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
  lastWeight?: number;
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
      this.getLastWeight();
      this.mealSize = this.snakeService.getMealSize(this.lastWeight!);
      this.mealFrequency = this.snakeService.getMealFrequency(this.lastWeight!);
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
    let lastIndex = this.snake.weightsDto!.length - 1;
    this.lastWeight = this.snake.weightsDto![lastIndex].weight;
  }

  quickFeed() {
    if (this.mealSize && this.lastWeight) {
      const currentDate = new Date().toLocaleDateString('en-US');
      const newFeeding: Feeding = {
        date: currentDate,
        item: this.mealSize,
      };
      this.snakeService
        .createNewRecord(newFeeding, 'feeding')
        .subscribe((feeding) => {
          this.lastMeal = feeding.date;
          this.snakeService
            .addRecordToSnake(feeding.id!, this.snake.id!, 'feeding')
            .subscribe(() => {
              window.alert('Success!');
            });
        });
    } else {
      window.alert(
        'You must add a have at least once feeding and weight on file to use the quick feed feature'
      );
    }
  }
}
