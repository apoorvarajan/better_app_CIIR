import { HomeActions, SET_TASKS, DECREMENT } from "./types";
import {Dispatch} from 'redux'
import {getTasks_api} from '../../controllers/apicalls'

export const  getTasks = () => {
    return async (dispatch:Dispatch) => {
        let data = await getTasks_api()
        dispatch(setTasks(data))
    }
}

export const setTasks = (tasks:any): HomeActions => {return {
    type: SET_TASKS,
    tasks
}};

export const decrementCounter = (): HomeActions => ({
    type: DECREMENT
});
