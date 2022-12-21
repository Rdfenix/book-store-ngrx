import { createReducer } from "@ngrx/store"
import { Books } from '../store/books'

export const initialState: ReadonlyArray<Books> = [];

export const bookReducer = createReducer(initialState)