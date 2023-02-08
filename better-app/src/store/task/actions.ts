import { HomeActions, SET_TASKS, DECREMENT, ADD_TASK_CLICK, SET_DOCS, DOC_DETAIL, ADD_REQUEST_CLICK, TASK_SELECTED } from "./types";
import {Dispatch} from 'redux'
import {getTasks_api,postTasks_api, submission_api} from '../../controllers/apicalls'
import Home from "../../components/Home";

export const  getTasks = () => {
    return async (dispatch:Dispatch) => {
        let data = await getTasks_api()
        dispatch(setTasks(data))
    }
}

export const docDetailPage = (docNum:any) => {
    return {
        type:DOC_DETAIL,
        docNum
    }
}

export const add_task = (obj_t:any) => {
    return async (dispatch:Dispatch) => {
        postTasks_api(obj_t)
    }
}

export const submission = (taskNum:string,reqNum:string) => {
    return async (dispatch:Dispatch) => {
        let data = await submission_api(taskNum,reqNum)
        dispatch(setDocs(data))
    }
}

// export const selectTask = (val:string) => {{
//         type: SELECT_TASK;
//         val:val
// }}

export const setDocs = (docs:any): HomeActions => {
    return {
        type: SET_DOCS,
        docs
    }
};

export const setTasks = (tasks:any): HomeActions => {
    return {
        type: SET_TASKS,
        tasks
    }
};

export const decrementCounter = (): HomeActions => ({
    type: DECREMENT
});

export const addTask_click = (val:boolean): HomeActions => ({
    type:ADD_TASK_CLICK,
    val:val
}) 

export const addRequest_click = (val:boolean): HomeActions => ({
    type:ADD_REQUEST_CLICK,
    val:val
})

export const task_selected = (val:number): HomeActions => ({
    type:TASK_SELECTED,
    val
})
