import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feeding } from 'src/assets/ultilities/models/feeding.model';
import { Shed } from 'src/assets/ultilities/models/shed.model';
import { Snake } from 'src/assets/ultilities/models/snake.model';
import { Weight } from 'src/assets/ultilities/models/weight.model';
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
  nextMeal?: string;

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
      if (
        this.snake.feedingOverride!.sizeOverride &&
        this.snake.feedingOverride!.mealSize
      ) {
        this.mealSize = this.snake.feedingOverride?.mealSize;
      } else {
        this.mealSize = this.snakeService.getMealSize(this.lastWeight!);
      }
      if (
        this.snake.feedingOverride?.frequencyOverride &&
        this.snake.feedingOverride.frequency
      ) {
        const days = this.snake.feedingOverride.frequency;
        this.mealFrequency = `Every ${days} days`;
      } else {
        this.mealFrequency = this.snakeService.getMealFrequency(
          this.lastWeight!
        );
      }
    }
    if (this.lastMeal && this.mealFrequency) {
      this.nextMeal = this.getNextFeedingDate(
        this.lastMeal,
        this.mealFrequency
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
    let lastIndex = this.snake.weightsDto!.length - 1;
    this.lastWeight = this.snake.weightsDto![lastIndex].weight;
  }

  getNextFeedingDate(lastMeal: string, mealFrequency: string) {
    const firstDate = new Date(lastMeal);
    let daysToAdd: number;
    if (mealFrequency.includes('days')) {
      daysToAdd = +mealFrequency.substring(5, 8);
    } else {
      daysToAdd = 14;
    }
    const rawDate = new Date(
      new Date(firstDate).setDate(firstDate.getDate() + daysToAdd)
    ).toLocaleDateString('en-US');
    return this.dateFormater(rawDate);
  }

  quickFeed() {
    if (this.mealSize && this.lastWeight) {
      const rawDate = new Date().toLocaleDateString('en-US');
      const currentDate = this.dateFormater(rawDate);

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
              this.refreshSnakeInfo();
              window.alert('Success!');
            });
        });
    } else {
      window.alert(
        'You must add a have at least one feeding and weight on file to use the quick feed feature'
      );
    }
  }

  quickWeight() {
    const rawDate = new Date().toLocaleDateString('en-US');
    const currentDate = this.dateFormater(rawDate);

    const prompt = window.prompt('What is the new recorded weight');
    if (prompt && +prompt) {
      const weightRecording = +prompt;
      const newWeight: Weight = {
        date: currentDate,
        weight: weightRecording,
      };
      this.snakeService
        .createNewRecord(newWeight, 'weight')
        .subscribe((weight) => {
          this.snakeService
            .addRecordToSnake(weight.id!, this.snake.id!, 'weight')
            .subscribe(() => {
              this.lastWeight = weightRecording;
              this.refreshSnakeInfo();
              window.alert('Success!');
            });
        });
    } else if (prompt) {
      window.alert('Please enter a number');
    }
  }

  quickShed() {
    const rawDate = new Date().toLocaleDateString('en-US');
    const currentDate = this.dateFormater(rawDate);

    const prompt = window.prompt(
      'Which shedding observation is to be recorded?'
    );
    if (
      prompt &&
      (prompt.toLowerCase() === 'shed' || prompt.toLowerCase() === 'noticed')
    ) {
      const shedRecording = prompt.charAt(0).toUpperCase() + prompt.slice(1);
      const newShed: Shed = {
        date: currentDate,
        observation: shedRecording,
      };
      this.snakeService.createNewRecord(newShed, 'shed').subscribe((shed) => {
        this.snakeService
          .addRecordToSnake(shed.id!, this.snake.id!, 'shed')
          .subscribe(() => {
            window.alert('Success!');
          });
      });
    } else if (
      prompt &&
      (prompt.toLowerCase() !== 'shed' || prompt.toLowerCase() !== 'noticed')
    ) {
      window.alert(
        "Please submit a correct obeservation, either 'Noticed' or 'Shed' "
      );
    }
  }

  refreshSnakeInfo() {
    if (
        this.snake.feedingOverride!.sizeOverride &&
        this.snake.feedingOverride!.mealSize
      ) {
        this.mealSize = this.snake.feedingOverride?.mealSize;
      } else {
        this.mealSize = this.snakeService.getMealSize(this.lastWeight!);
      }
      if (
        this.snake.feedingOverride?.frequencyOverride &&
        this.snake.feedingOverride.frequency
      ) {
        const days = this.snake.feedingOverride.frequency;
        this.mealFrequency = `Every ${days} days`;
      } else {
        this.mealFrequency = this.snakeService.getMealFrequency(
          this.lastWeight!
        );
      }
    
    this.nextMeal = this.getNextFeedingDate(this.lastMeal!, this.mealFrequency);
  }

  formatLastNote(note: string) {
    if (note.length > 100) {
      return `${note.substring(0, 100)}...`;
    } else return note;
  }

  dateFormater(date: string) {
    const components = date.split('/');
    const month = components[0].padStart(2, '0');
    const day = components[1].padStart(2, '0');
    const year = components[2];
    return `${month}/${day}/${year}`;
  }
}
