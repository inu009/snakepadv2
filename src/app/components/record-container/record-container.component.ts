import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/assets/ultilities/services/ui.service';

@Component({
  selector: 'app-record-container',
  templateUrl: './record-container.component.html',
  styleUrls: ['./record-container.component.css'],
})
export class RecordContainerComponent {
  showAddRecord: boolean = false;
  subscription!: Subscription;
  record = '';

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddRecord = value));
  }

  toggleAddRecord() {
    this.uiService.toggleAddRecord();
  }

  storeRecord(record: string) {
    this.record = record;
  }
}
