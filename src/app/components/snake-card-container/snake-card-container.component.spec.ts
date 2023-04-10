import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeCardContainerComponent } from './snake-card-container.component';

describe('SnakeCardContainerComponent', () => {
  let component: SnakeCardContainerComponent;
  let fixture: ComponentFixture<SnakeCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnakeCardContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakeCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
