import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverrideSetComponent } from './override-set.component';

describe('OverrideSetComponent', () => {
  let component: OverrideSetComponent;
  let fixture: ComponentFixture<OverrideSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverrideSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverrideSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
