import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordAddFormComponent } from './record-add-form.component';

describe('RecordAddFormComponent', () => {
  let component: RecordAddFormComponent;
  let fixture: ComponentFixture<RecordAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
