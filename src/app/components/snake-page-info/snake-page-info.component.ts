import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-snake-page-info',
  templateUrl: './snake-page-info.component.html',
  styleUrls: ['./snake-page-info.component.css'],
})
export class SnakePageInfoComponent implements OnInit {
  @Input() snake!: Snake;
  @Input() lastMeal?: string;
  @Input() lastNote?: string;
  @Input() mealSize?: string;
  @Input() mealFrequency?: string;
  @Input() lastWeight?: number;
  @Input() feedings!: Feeding[];
  @Input() sheds!: Shed[];
  @Input() weights!: Weight[];
  @Input() notes!: Note[];

  editRecords: boolean = false;
  toggleEditRecordDisabled = false;

  constructor(
    public snakeService: SnakeService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {}

  toggleEditRecords() {
    if (this.editRecords) {
      this.editRecords = false;
      this.stateService.recordUpdateButtonClicked();
    } else {
      this.editRecords = true;
    }
  }

  updateRecord(
    typeOfRecord: 'feeding' | 'weight' | 'shed' | 'note',
    record: Note | Shed | Weight | Feeding
  ) {
    this.toggleEditRecordDisabled = true;
    this.snakeService.updateRecord(typeOfRecord, record).subscribe(() => {
      window.alert('Successfully Updated!');
      this.toggleEditRecordDisabled = false;
    });
  }

  deleteRecord(
    typeOfRecord: 'feeding' | 'weight' | 'shed' | 'note',
    id: number
  ) {
    this.snakeService
      .deleteRecord(typeOfRecord, id)
      .subscribe((record: Note | Shed | Weight | Feeding) => {
        switch (typeOfRecord) {
          case 'feeding':
            this.feedings = this.feedings.filter(
              (feeding) => feeding.id != record.id
            );
            break;
          case 'weight':
            this.weights = this.weights.filter(
              (weight) => weight.id !== record.id
            );
            break;
          case 'shed':
            this.sheds = this.sheds.filter((shed) => shed.id !== record.id);
            break;
          case 'note':
            this.notes = this.notes.filter((notes) => notes.id !== record.id);
            break;
        }
      });
  }
}
