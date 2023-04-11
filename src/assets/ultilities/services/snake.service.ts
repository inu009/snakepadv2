import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Snake } from '../models/snake.model';
import { SnakeResponse } from '../models/snakeResponse.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  apiUrl: string = 'http://localhost:8080/api/snakes';

  constructor(private http: HttpClient) {}

  fetchSnakes(): Observable<Snake[]> {
    return this.http.get<Snake[]>(this.apiUrl);
  }

  addSnake(snake: Snake): Observable<Snake> {
    return this.http.post<Snake>(this.apiUrl, snake, httpOptions);
  }

  deleteSnake(snake: Snake) {
    return this.http.delete<Snake>(`${this.apiUrl}/${snake.id}`);
  }
}
