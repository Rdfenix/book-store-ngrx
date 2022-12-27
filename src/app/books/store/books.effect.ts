import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from "src/app/shared/store/app.action";
import { Appstate } from "src/app/shared/store/appstate";
import { BooksService } from '../books.service';
import { Books } from "./books";
import { booksFetchAPISuccess, invokeBooksAPI, invokeSaveNewBookAPI, invokeUpdateBookAPI, saveNewBookAPISucess, updateBookAPISucess } from './books.action';
import { selectBooks } from './books.selector';

@Injectable()
export class BooksEffect {
    constructor(private actions$: Actions, private bookService: BooksService, private store: Store<Books[]>, private appStore: Store<Appstate>) { }

    loadAllBooks$ = createEffect(() => this.actions$.pipe(ofType(invokeBooksAPI), withLatestFrom(this.store.pipe(select(selectBooks))), mergeMap(([, bookformStore]) => {
        /**If the data already exists in the ngrx store, then return 'EMTY' observable */
        if (bookformStore.length > 0) {
            return EMPTY;
        }
        return this.bookService.getBooks().pipe(map(data => booksFetchAPISuccess({ allBooks: data })))
    })))

    saveNewBook$ = createEffect(() => {
        return this.actions$.pipe(ofType(invokeSaveNewBookAPI), switchMap(action => {
            this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }));

            return this.bookService.addBook(action.newBook).pipe(map(data => {
                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } }));
                return saveNewBookAPISucess({ newBook: data })
            }))
        }))
    })

    updateBookAPI$ = createEffect(() => {
        return this.actions$.pipe(ofType(invokeUpdateBookAPI), switchMap(action => {
            this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }))
            
            return this.bookService.updateBook(action.updateBook).pipe(map(data => {
                this.appStore.dispatch(setAPIStatus({
                    apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                }))
                return updateBookAPISucess({ updateBook: data })
            }))
        }))
    })

    
}
