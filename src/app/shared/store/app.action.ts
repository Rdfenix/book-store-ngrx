import { createAction, props } from "@ngrx/store"
import { actions } from "./action-enums"
import { Appstate } from './appstate'

export const setAPIStatus = createAction(actions.API_SUCCESS_FAILURE,
    props<{ apiStatus: Appstate }>())
