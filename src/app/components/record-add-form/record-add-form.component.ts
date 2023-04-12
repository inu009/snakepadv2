import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Feeding } from 'src/assets/ultilities/models/feeding.model';
import { Note } from 'src/assets/ultilities/models/note.model';
import { Shed } from 'src/assets/ultilities/models/shed.model';
import { Snake } from 'src/assets/ultilities/models/snake.model';
import { Weight } from 'src/assets/ultilities/models/weight.model';
import { SnakeService } from 'src/assets/ultilities/services/snake.service';
import { UiService } from 'src/assets/ultilities/services/ui.service';

@Component({
  selector: 'app-record-add-form',
  templateUrl: './record-add-form.component.html',
  styleUrls: ['./record-add-form.component.css'],
})
export class RecordAddFormComponent {
  @Input() record: string = '';
  @Output() onAddFeeding: EventEmitter<Feeding> = new EventEmitter();
  @Output() onAddShed: EventEmitter<Shed> = new EventEmitter();
  @Output() onAddWeight: EventEmitter<Weight> = new EventEmitter();
  @Output() onAddNote: EventEmitter<Note> = new EventEmitter();
  @Output() onUpdate: EventEmitter<Snake> = new EventEmitter();

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

  constructor(
    private uiService: UiService,
    private route: ActivatedRoute,
    private snakeService: SnakeService
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
    // const updatedsnake: Snake = this.snake;
    // this.snakeService.updateSnake(updatedsnake, this.snakeId).subscribe();
    // this.onUpdate.emit(updatedsnake);

    console.log('hi');
  }

  onSubmitFeeding() {
    const newFeeding: Feeding = {
      date: this.dateConverter(this.feedingDate),
      item: this.foodItem,
    };

    this.onAddFeeding.emit(newFeeding);

    this.feedingDate = '';
    this.foodItem = '';
  }

  onSubmitShed() {
    const newShed: Shed = {
      date: this.dateConverter(this.shedDate),
      observation: this.observation,
    };
    this.onAddShed.emit(newShed);

    this.shedDate = '';
    this.observation = '';
  }

  onSubmitWeight() {
    const newWeight: Weight = {
      date: this.dateConverter(this.weightDate),
      weight: this.weight,
    };
    this.onAddWeight.emit(newWeight);

    this.weightDate = '';
    this.weight = 0;
  }

  onSubmitNote() {
    const newNote: Note = {
      date: this.dateConverter(this.noteDate),
      note: this.note,
    };
    this.onAddNote.emit(newNote);

    this.noteDate = '';
    this.note = '';
  }

  dateConverter(date: string) {
    return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`;
  }
}
