import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Feeding } from 'src/assets/ultilities/models/feeding.model';
import { Note } from 'src/assets/ultilities/models/note.model';
import { Shed } from 'src/assets/ultilities/models/shed.model';
import { Snake } from 'src/assets/ultilities/models/snake.model';
import { Weight } from 'src/assets/ultilities/models/weight.model';
import { SnakeService } from 'src/assets/ultilities/services/snake.service';
import { StateService } from 'src/assets/ultilities/services/state.service';
import { UiService } from 'src/assets/ultilities/services/ui.service';

@Component({
  selector: 'app-snake-page',
  templateUrl: './snake-page.component.html',
  styleUrls: ['./snake-page.component.css'],
})
export class SnakePageComponent implements OnInit {
  snake!: Snake;
  id = Number(this.route.snapshot.paramMap.get('id'));
  lastMeal?: string;
  lastNote?: string;
  mealSize?: string;
  mealFrequency?: string;
  lastWeight?: number;
  feedings: Feeding[] = [];
  weights: Weight[] = [];
  notes: Note[] = [];
  sheds: Shed[] = [];

  constructor(
    private route: ActivatedRoute,
    private snakeService: SnakeService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.getSnake();
    this.stateService.actionSourceObervable.subscribe(() => {
      this.getSnake();
    });
  }

  getSnake() {
    this.snakeService.getSnakeById(this.id).subscribe((snake) => {
      if (snake) {
        this.snake = snake;
        if (this.snake.feedingsDto![Array.length - 1]) {
          this.getLastMeal();
          this.feedings = this.snake.feedingsDto!;
        }
        if (this.snake.notesDto![Array.length - 1]) {
          this.getLastNote();
          this.notes = this.snake.notesDto!;
        }
        if (this.snake.weightsDto![Array.length - 1]) {
          this.getLastWeight();
          this.mealSize = this.snakeService.getMealSize(this.lastWeight!);
          this.mealFrequency = this.snakeService.getMealFrequency(
            this.lastWeight!
          );
          this.weights = this.snake.weightsDto!;
        }
        if (this.snake.shedsDto![Array.length - 1]) {
          this.sheds = this.snake.shedsDto!;
        }
      }
    });
  }

  getLastMeal() {
    const index = this.snake.feedingsDto!.length - 1;
    this.lastMeal = this.snake.feedingsDto![index].date;
  }

  getLastNote() {
    this.lastNote = this.snake.notesDto![Array.length - 1].note;
  }

  getLastWeight() {
    const index = this.snake.weightsDto!.length - 1;
    this.lastWeight = this.snake.weightsDto![index].weight;
  }
}
