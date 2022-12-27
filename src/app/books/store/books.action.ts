import { createAction, props } from '@ngrx/store'
import { actions } from 'src/app/shared/store/action-enums';
import { Books } from './books'

export const invokeBooksAPI = createAction(actions.FETCH_API);

export const booksFetchAPISuccess = createAction(
    actions.API_SUCCESS,
    props<{ allBooks: Books[] }>()
);

export const invokeSaveNewBookAPI = createAction(
    actions.NEW_BOOK_API,
    props<{ newBook: Books }>()
);

export const saveNewBookAPISucess = createAction(
    actions.NEW_BOOK_API_SUCCESS,
    props<{ newBook: Books }>()
);