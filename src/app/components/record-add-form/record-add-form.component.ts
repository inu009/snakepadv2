import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-record-add-form',
  templateUrl: './record-add-form.component.html',
  styleUrls: ['./record-add-form.component.css'],
})
export class RecordAddFormComponent {
  @Input() record: string = '';

  showAddRecord = false;
  subscription: Subscription;
  feedingDate: string = '';
  weightDate: string = '';
  shedDate: string = '';
  noteDate: string = '';
  foodItem: string = '';
  observation: string = '';
  weight: number = 0;
  note: string = '';
  snakeId = Number(this.route.snapshot.paramMap.get('id'));
  snake!: Snake;

  weightId?: number = 0;

  constructor(
    private uiService: UiService,
    private route: ActivatedRoute,
    private snakeService: SnakeService,
    private stateService: StateService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddRecord = value));
  }

  ngOnInit(): void {
    this.snakeService.getSnakeById(this.snakeId).subscribe((snake) => {
      if (snake) {
        this.snake = snake;
      }
    });
  }

  onUpdateSnake() {
    const updatedsnake: Snake = this.snake;
    this.snakeService
      .updateSnake(updatedsnake, this.snakeId)
      .subscribe(() => this.stateService.buttonClicked());
  }

  onSubmitFeeding() {
    const newFeeding: Feeding = {
      date: this.dateConverter(this.feedingDate),
      item: this.foodItem,
    };

    this.snakeService
      .createNewRecord(newFeeding, 'feeding')
      .subscribe((feeding) => {
        this.snakeService
          .addRecordToSnake(feeding.id!, this.snakeId, 'feeding')
          .subscribe(() => this.stateService.buttonClicked());
      });

    this.feedingDate = '';
    this.foodItem = '';
  }

  onSubmitShed() {
    const newShed: Shed = {
      date: this.dateConverter(this.shedDate),
      observation: this.observation,
    };
    this.snakeService.createNewRecord(newShed, 'shed').subscribe((shed) => {
      this.snakeService
        .addRecordToSnake(shed.id!, this.snakeId, 'shed')
        .subscribe(() => this.stateService.buttonClicked());
    });

    this.shedDate = '';
    this.observation = '';
  }

  onSubmitWeight() {
    const newWeight: Weight = {
      date: this.dateConverter(this.weightDate),
      weight: this.weight,
    };

    this.snakeService
      .createNewRecord(newWeight, 'weight')
      .subscribe((weight) => {
        this.snakeService
          .addRecordToSnake(weight.id!, this.snakeId, 'weight')
          .subscribe(() => this.stateService.buttonClicked());
      });

    this.weightDate = '';
    this.weight = 0;
    this.stateService.buttonClicked();
  }

  onSubmitNote() {
    const newNote: Note = {
      date: this.dateConverter(this.noteDate),
      note: this.note,
    };
    this.snakeService.createNewRecord(newNote, 'note').subscribe((note) => {
      this.snakeService
        .addRecordToSnake(note.id!, this.snakeId, 'note')
        .subscribe(() => this.stateService.buttonClicked());
    });

    this.noteDate = '';
    this.note = '';
  }

  dateConverter(date: string) {
    return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`;
  }
}
