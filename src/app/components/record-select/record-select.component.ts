import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/assets/ultilities/services/ui.service';

@Component({
  selector: 'app-record-select',
  templateUrl: './record-select.component.html',
  styleUrls: ['./record-select.component.css'],
})
export class RecordSelectComponent {
  @Output() onAddRecord: EventEmitter<string> = new EventEmitter();
  showAddRecord = false;
  subscription!: Subscription;
  record = '';

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddRecord = value));
  }

  onSubmit() {
    this.onAddRecord.emit(this.record);
  }
}
