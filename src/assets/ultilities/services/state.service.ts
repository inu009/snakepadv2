import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private actionSource = new Subject<boolean>();
  actionSourceObervable = this.actionSource.asObservable();

  private updateClick = new Subject<boolean>();
  updateClickObservable = this.updateClick.asObservable();

  buttonClicked() {
    this.actionSource.next(true);
  }

  recordUpdateButtonClicked() {
    this.updateClick.next(true);
  }
}
