import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Books } from './store/books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Books[]> {
    return this.http.get<Books[]>('http://localhost:3004/books')
  }

  addBook(payload: Books): Observable<any> {
    return this.http.post<Books>('http://localhost:3000/books', payload)
  }
}
