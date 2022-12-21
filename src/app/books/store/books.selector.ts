import { createFeatureSelector } from '@ngrx/store'
import { Books } from '../store/books'

export const selectBooks = createFeatureSelector<Books[]>('mybooks')