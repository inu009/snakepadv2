import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.stateService.updateClickObservable.subscribe(() => {
      this.feedings = this.sortRecordArrayByDate(this.snake.feedingsDto!);
      this.weights = this.sortRecordArrayByDate(this.snake.weightsDto!);
      this.notes = this.sortRecordArrayByDate(this.snake.notesDto!);
      this.sheds = this.sortRecordArrayByDate(this.snake.shedsDto!);
    });
  }

  getSnake() {
    this.snakeService.getSnakeById(this.id).subscribe((snake) => {
      if (snake) {
        this.snake = snake;
        if (this.snake.feedingsDto![Array.length - 1]) {
          this.getLastMeal();
          this.feedings = this.sortRecordArrayByDate(this.snake.feedingsDto!);
        }
        if (this.snake.notesDto![Array.length - 1]) {
          this.getLastNote();
          this.notes = this.sortRecordArrayByDate(this.snake.notesDto!);
        }
        if (this.snake.weightsDto![Array.length - 1]) {
          this.getLastWeight();
          this.mealSize = this.snakeService.getMealSize(this.lastWeight!);
          this.mealFrequency = this.snakeService.getMealFrequency(
            this.lastWeight!
          );
          this.weights = this.sortRecordArrayByDate(this.snake.weightsDto!);
        }
        if (this.snake.shedsDto![Array.length - 1]) {
          this.sheds = this.sortRecordArrayByDate(this.snake.shedsDto!);
        }
      }
    });
  }

  sortRecordArrayByDate(
    recordArray: Shed[] | Note[] | Feeding[] | Weight[]
  ): any {
    return recordArray.sort(
      (recordA, recordB) =>
        new Date(recordA.date).getTime() - new Date(recordB.date).getTime()
    );
  }

  getLastMeal() {
    const index = this.snake.feedingsDto!.length - 1;
    this.lastMeal = this.sortRecordArrayByDate(this.snake.feedingsDto!)[
      index
    ].date;
  }

  getLastNote() {
    const index = this.snake.notesDto!.length - 1;
    this.lastNote = this.sortRecordArrayByDate(this.snake.notesDto!)[
      index
    ].note;
  }

  getLastWeight() {
    const index = this.snake.weightsDto!.length - 1;
    this.lastWeight = this.sortRecordArrayByDate(this.snake.weightsDto!)[
      index
    ].weight;
  }
}
