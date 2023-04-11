import { Component, Input, OnInit } from '@angular/core';
import { Snake } from 'src/assets/ultilities/models/snake.model';

@Component({
  selector: 'app-snake-page-info',
  templateUrl: './snake-page-info.component.html',
  styleUrls: ['./snake-page-info.component.css'],
})
export class SnakePageInfoComponent implements OnInit {
  @Input() snake!: Snake;
  lastMeal?: string;
  lastNote?: string;
  mealSize?: string;
  mealFrequency?: string;
  lastWeight?: number;

  ngOnInit() {
    console.log(this.snake);
    if (this.snake.feedingsDto![Array.length - 1]) {
      this.getLastMeal();
    }
    if (this.snake.notesDto![Array.length - 1]) {
      this.getLastNote();
    }
    if (this.snake.weightsDto![Array.length - 1]) {
      this.getLastWeight();
      this.getMealSize();
    }
  }

  getLastMeal() {
    this.lastMeal = this.snake.feedingsDto![Array.length - 1].date;
  }

  getLastNote() {
    this.lastWeight = this.snake.weightsDto![Array.length - 1].weight;
  }

  getLastWeight() {
    this.lastWeight = this.snake.weightsDto![Array.length - 1].weight;
  }

  getMealSize() {
    if (this.lastWeight! <= 15) {
      this.mealSize = 'Pinky';
      this.mealFrequency = 'Every 4 days';
    } else if (this.lastWeight! > 16 && this.lastWeight! <= 30) {
      this.mealSize = 'Small Fuzzy';
      this.mealFrequency = 'Every 7 days';
    } else if (this.lastWeight! > 31 && this.lastWeight! <= 50) {
      this.mealSize = 'Regular Fuzzy';
      this.mealFrequency = 'Every 7 days';
    } else if (this.lastWeight! > 51 && this.lastWeight! <= 90) {
      this.mealSize = 'Hopper';
      this.mealFrequency = 'Every 7 days';
    } else if (this.lastWeight! > 91 && this.lastWeight! <= 170) {
      this.mealSize = 'Weaned';
      this.mealFrequency = 'Every 7 days';
    } else if (this.lastWeight! > 171 && this.lastWeight! <= 400) {
      this.mealSize = 'Adult';
      this.mealFrequency = 'Every 10 days';
    } else if (this.lastWeight!) {
      this.mealSize = 'Jumbo';
      this.mealFrequency = 'Every 2 weeks';
    }
  }
}
