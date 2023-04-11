import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakePageInfoComponent } from './snake-page-info.component';

describe('SnakePageInfoComponent', () => {
  let component: SnakePageInfoComponent;
  let fixture: ComponentFixture<SnakePageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnakePageInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakePageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
