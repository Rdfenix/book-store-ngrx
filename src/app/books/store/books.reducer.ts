import { createReducer, on } from "@ngrx/store"
import { Books } from '../store/books'
import { booksFetchAPISuccess, saveNewBookAPISucess, updateBookAPISucess } from "./books.action";

export const initialState: ReadonlyArray<Books> = [];

export const bookReducer = createReducer(initialState, on(booksFetchAPISuccess, (state, { allBooks }) => {
    return allBooks;
}), on(saveNewBookAPISucess, (state, { newBook }) => {
    let newState = [...state];
    newState.unshift(newBook);

    return newState
}), on(updateBookAPISucess, (state, { updateBook }) => {
    let newState = state.filter((_) => _.id != updateBook.id)
    newState.unshift(updateBook);

    return newState
}))