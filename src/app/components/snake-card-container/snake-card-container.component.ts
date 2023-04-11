import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Snake } from 'src/assets/ultilities/models/snake.model';
import { SnakeService } from 'src/assets/ultilities/services/snake.service';
import { UiService } from 'src/assets/ultilities/services/ui.service';

@Component({
  selector: 'app-snake-card-container',
  templateUrl: './snake-card-container.component.html',
  styleUrls: ['./snake-card-container.component.css'],
})
export class SnakeCardContainerComponent implements OnInit {
  showAddSnake: boolean = false;
  subscription!: Subscription;
  snakes: Snake[] = [];

  constructor(
    private snakeService: SnakeService,
    private uiService: UiService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddSnake = value));
  }

  ngOnInit() {
    this.snakeService
      .fetchSnakes()
      .subscribe((snakes) => (this.snakes = snakes));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleAddSnake() {
    this.uiService.toggleAddSnake();
  }

  addSnake(snake: Snake) {
    this.snakeService
      .addSnake(snake)
      .subscribe((snake) => this.snakes.push(snake));
  }

  deleteSnake(snake: Snake) {
    if (confirm(`Are you sure you want to delete ${snake.name}`)) {
      this.snakeService
        .deleteSnake(snake)
        .subscribe(
          () =>
            (this.snakes = this.snakes.filter(
              (deletedSnake) => deletedSnake.id !== snake.id
            ))
        );
    }
  }
}
