import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Snake } from 'src/assets/ultilities/models/snake.model';
import { UiService } from 'src/assets/ultilities/services/ui.service';

@Component({
  selector: 'app-add-snake-form',
  templateUrl: './add-snake-form.component.html',
  styleUrls: ['./add-snake-form.component.css'],
})
export class AddSnakeFormComponent {
  @Output() onAddSnake: EventEmitter<Snake> = new EventEmitter();

  owner!: string;
  name!: string | null;
  imgUrl!: string;
  gender: 'Male' | 'Female' | 'Unknown' = 'Unknown';
  breederId!: string;
  showAddSnake: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddSnake = value));
  }

  onSubmit() {
    if (!this.name) {
      alert('Please add a snake!');
      return;
    } else {
      const newSnake = {
        owner: this.owner,
        name: this.name,
        imgUrl: this.imgUrl,
        gender: this.gender,
        breederId: this.breederId,
      };
      // console.log(newSnake);
      this.onAddSnake.emit(newSnake);

      this.owner = '';
      this.name = null;
      this.imgUrl = '';
      this.gender = 'Unknown';
      this.breederId = '';
    }
  }
}
