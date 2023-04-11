import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Snake } from 'src/assets/ultilities/models/snake.model';
import { SnakeService } from 'src/assets/ultilities/services/snake.service';
import { UiService } from 'src/assets/ultilities/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'snake-pad-v2';
}
