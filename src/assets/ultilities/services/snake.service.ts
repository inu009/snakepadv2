import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Snake } from '../models/snake.model';
import { Weight } from '../models/weight.model';
import { Feeding } from '../models/feeding.model';
import { Note } from '../models/note.model';
import { Shed } from '../models/shed.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchSnakes(): Observable<Snake[]> {
    return this.http
      .get<Snake[]>(`${this.apiUrl}/api/snakes`)
      .pipe(
        map((snakes) =>
          snakes.sort((snakeA, snakeB) => snakeA.id! - snakeB.id!)
        )
      );
  }
  getSnakeById(id: number): Observable<Snake | undefined> {
    return this.http.get<Snake>(`${this.apiUrl}/api/snakes/${id}`);
  }

  addSnake(snake: Snake): Observable<Snake> {
    return this.http.post<Snake>(
      `${this.apiUrl}/api/snakes`,
      snake,
      httpOptions
    );
  }

  deleteSnake(snake: Snake): Observable<Snake> {
    return this.http.delete<Snake>(`${this.apiUrl}/api/snakes/${snake.id}`);
  }

  updateSnake(snake: Snake, id: number): Observable<Snake> {
    return this.http.put<Snake>(
      `${this.apiUrl}/api/snakes/${id}`,
      snake,
      httpOptions
    );
  }

  createNewRecord(
    record: Feeding | Weight | Note | Shed,
    typeOfRecord: string
  ): Observable<Feeding | Weight | Note | Shed> {
    return this.http.post<Feeding | Weight | Note | Shed>(
      `${this.apiUrl}/api/${typeOfRecord}s`,
      record,
      httpOptions
    );
  }

  addRecordToSnake(recordId: number, snakeId: number, typeOfRecord: string) {
    return this.http.post(
      `${this.apiUrl}/api/snakes/${snakeId}/${typeOfRecord}s/${recordId}/add`,
      httpOptions
    );
  }

  updateRecord(
    typeOfRecord: string,
    record: Feeding | Weight | Note | Shed
  ): Observable<Feeding | Weight | Note | Shed> {
    return this.http.put<Feeding | Weight | Note | Shed>(
      `${this.apiUrl}/api/${typeOfRecord}s/${record.id}`,
      record,
      httpOptions
    );
  }

  deleteRecord(
    typeOfRecord: string,
    recordId: number
  ): Observable<Feeding | Weight | Note | Shed> {
    return this.http.delete<Feeding | Weight | Note | Shed>(
      `${this.apiUrl}/api/${typeOfRecord}s/${recordId}`
    );
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
      return 'Adult';
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
      return 'Every 10 days';
    } else if (weight > 171 && weight <= 400) {
      return 'Every 10 days';
    } else {
      return 'Every 2 weeks';
    }
  }
}
