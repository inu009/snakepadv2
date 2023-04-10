import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeCardComponent } from './snake-card.component';

describe('SnakeCardComponent', () => {
  let component: SnakeCardComponent;
  let fixture: ComponentFixture<SnakeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnakeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
