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

  lastMeal?: string;
  lastNote?: string;
  mealSize?: string;
  mealFrequency?: string;

  ngOnInit() {
    console.log(this.snake);
    if (this.snake.feedingsDto![Array.length - 1]) {
      this.getLastMeal();
      this.getMealSize();
    }
    if (this.snake.notesDto![Array.length - 1]) {
      this.getLastNote();
    }
  }

  onClick() {
    this.buttonClick.emit(this.snake);
  }

  getLastMeal() {
    this.lastMeal = this.snake.feedingsDto![Array.length - 1].date;
    console.log(this.lastMeal);
  }

  getLastNote() {
    this.lastNote = this.snake.notesDto![Array.length - 1].note;
  }

  getMealSize() {
    const weight: number = this.snake.weightsDto![Array.length - 1].weight;
    if (weight <= 15) {
      this.mealSize = 'Pinky';
      this.mealFrequency = 'Every 4 days';
    } else if (weight > 16 && weight <= 30) {
      this.mealSize = 'Small Fuzzy';
      this.mealFrequency = 'Every 7 days';
    } else if (weight > 31 && weight <= 50) {
      this.mealSize = 'Regular Fuzzy';
      this.mealFrequency = 'Every 7 days';
    } else if (weight > 51 && weight <= 90) {
      this.mealSize = 'Hopper';
      this.mealFrequency = 'Every 7 days';
    } else if (weight > 91 && weight <= 170) {
      this.mealSize = 'Weaned';
      this.mealFrequency = 'Every 7 days';
    } else if (weight > 171 && weight <= 400) {
      this.mealSize = 'Adult';
      this.mealFrequency = 'Every 10 days';
    } else if (weight) {
      this.mealSize = 'Jumbo';
      this.mealFrequency = 'Every 2 weeks';
    }
  }
}
