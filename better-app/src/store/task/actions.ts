import { HomeActions, SET_TASKS, DECREMENT, ADD_TASK_CLICK } from "./types";
import {Dispatch} from 'redux'
import {getTasks_api} from '../../controllers/apicalls'
import Home from "../../components/Home";

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

export const addTask_click = (): HomeActions => ({
    type:ADD_TASK_CLICK
}) 
