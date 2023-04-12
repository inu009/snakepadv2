import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddSnake: boolean = false;
  private showAddRecord: boolean = false;
  private subject = new Subject<any>();

  toggleAddSnake(): void {
    this.showAddSnake = !this.showAddSnake;
    this.subject.next(this.showAddSnake);
  }
  toggleAddRecord(): void {
    this.showAddRecord = !this.showAddRecord;
    this.subject.next(this.showAddRecord);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
