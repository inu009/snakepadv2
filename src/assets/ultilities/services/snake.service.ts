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

  getSnakeById(id: number): Observable<Snake | undefined> {
    return this.http.get<Snake>(`${this.apiUrl}/${id}`);
  }

  getMealSize(weight: number): string {
    if (weight <= 15) {
      return 'Pinky';
    } else if (weight > 16 && weight <= 30) {
      return 'Small Fuzzy';
    } else if (weight > 31 && weight <= 50) {
      return 'Regular Fuzzy';
    } else if (weight > 51 && weight <= 90) {
      return 'Hopper';
    } else if (weight > 91 && weight <= 170) {
      return 'Weaned';
    } else if (weight > 171 && weight <= 400) {
      return 'Adult';
    } else {
      return 'Jumbo';
    }
  }

  getMealFrequency(weight: number): string {
    if (weight <= 15) {
      return 'Every 4 days';
    } else if (weight > 16 && weight <= 30) {
      return 'Every 7 days';
    } else if (weight > 31 && weight <= 50) {
      return 'Every 7 days';
    } else if (weight > 51 && weight <= 90) {
      return 'Every 7 days';
    } else if (weight > 91 && weight <= 170) {
      return 'Every 7 days';
    } else if (weight > 171 && weight <= 400) {
      return 'Every 10 days';
    } else {
      return 'Every 2 weeks';
    }
  }
}
