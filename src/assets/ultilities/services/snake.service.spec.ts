import { TestBed } from '@angular/core/testing';

import { SnakeServiceService } from './snake.service.service';

describe('SnakeServiceService', () => {
  let service: SnakeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnakeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
