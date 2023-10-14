import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedingOverride } from 'src/assets/ultilities/models/feedingOverride.model';
import { SnakeService } from 'src/assets/ultilities/services/snake.service';
import { StateService } from 'src/assets/ultilities/services/state.service';
import { UiService } from 'src/assets/ultilities/services/ui.service';

@Component({
  selector: 'app-override-set',
  templateUrl: './override-set.component.html',
  styleUrls: ['./override-set.component.css'],
})
export class OverrideSetComponent implements OnInit {
  @Input() feedingOverride?: FeedingOverride;
  text!: string;

  showOverrideUI: boolean = false;
  subscription: Subscription;

  constructor(
    private snakeService: SnakeService,
    private stateService: StateService,
    private uiService: UiService
  ) {
    this.subscription = this.uiService
      .onOverrideToggle()
      .subscribe((value) => (this.showOverrideUI = value));
  }

  ngOnInit() {
    console.log(this.feedingOverride);
  }

  toggleshowOverrideUI() {
    this.uiService.toggleEditOverride();
  }

  onSubmit() {
    if (this.feedingOverride) {
      this.snakeService
        .updateFeedOveride(this.feedingOverride)
        .subscribe(() => {
          this.stateService.buttonClicked();
          window.alert('Feeding override completed successfully!');
          this.showOverrideUI = false;
        });
    }
  }
}
