import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSnakeFormComponent } from './add-snake-form.component';

describe('AddSnakeFormComponent', () => {
  let component: AddSnakeFormComponent;
  let fixture: ComponentFixture<AddSnakeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSnakeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSnakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
