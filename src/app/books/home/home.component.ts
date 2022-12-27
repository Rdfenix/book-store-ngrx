import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Books } from '../store/books';
import { invokeBooksAPI } from '../store/books.action';
import { selectBooks } from '../store/books.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<Books[]>) { }

  books$ = this.store.pipe(select(selectBooks))

  ngOnInit(): void {
    this.store.dispatch(invokeBooksAPI());
  }

}
