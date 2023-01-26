import { HomeActions, SET_TASKS, DECREMENT, ADD_TASK_CLICK, SELECT_TASK } from "./types";
import {Dispatch} from 'redux'
import {getTasks_api,postTasks_api} from '../../controllers/apicalls'
import Home from "../../components/Home";

export const  getTasks = () => {
    return async (dispatch:Dispatch) => {
        let data = await getTasks_api()
        dispatch(setTasks(data))
    }
}

export const add_task = (obj_t:any) => {
    return async (dispatch:Dispatch) => {
        postTasks_api(obj_t)
    }
}

// export const selectTask = (val:string) => {{
//         type: SELECT_TASK;
//         val:val
// }}

export const setTasks = (tasks:any): HomeActions => {
    return {
        type: SET_TASKS,
        tasks
    }
};

export const decrementCounter = (): HomeActions => ({
    type: DECREMENT
});

export const addTask_click = (): HomeActions => ({
    type:ADD_TASK_CLICK
}) 
