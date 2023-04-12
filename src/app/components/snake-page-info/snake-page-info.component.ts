import { Component, Input, OnInit } from '@angular/core';
import { Feeding } from 'src/assets/ultilities/models/feeding.model';
import { Note } from 'src/assets/ultilities/models/note.model';
import { Shed } from 'src/assets/ultilities/models/shed.model';
import { Snake } from 'src/assets/ultilities/models/snake.model';
import { Weight } from 'src/assets/ultilities/models/weight.model';

@Component({
  selector: 'app-snake-page-info',
  templateUrl: './snake-page-info.component.html',
  styleUrls: ['./snake-page-info.component.css'],
})
export class SnakePageInfoComponent {
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
}
