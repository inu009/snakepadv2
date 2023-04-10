import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Snake } from '../models/snake.model';
import { SnakeResponse } from '../models/snakeResponse.model';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  constructor(private http: HttpClient) {}

  fetchSnakes(): Observable<Snake[]> {
    return this.http.get<Snake[]>('http://localhost:8080/api/snakes');
  }
}
