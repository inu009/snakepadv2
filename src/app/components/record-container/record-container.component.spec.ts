import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordContainerComponent } from './record-container.component';

describe('RecordContainerComponent', () => {
  let component: RecordContainerComponent;
  let fixture: ComponentFixture<RecordContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
