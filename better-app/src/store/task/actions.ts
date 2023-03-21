import { HomeActions, SET_TASKS, DECREMENT, ADD_TASK_CLICK, SET_DOCS, DOC_DETAIL, ADD_REQUEST_CLICK, 
    TASK_SELECTED, RESET_HOME, LOADING_SUBMISSION, LOADER_HOME, SHOW_EVENT, GOBACK_DETAILS, TRANSLATE_ENGLISH,
    SHOW_ALL_EVENTS, SHOW_ALL_EVENT_GRAPH, EVENT_SUMMARY } from "./types";
import {Dispatch} from 'redux'
import {getTasks_api,postTasks_api, submission_api,postRequest_api} from '../../controllers/apicalls'

export const loaderHome = (val:boolean) =>{
    return {
        type:LOADER_HOME,
        val
    }
}

export const  getTasks = () => {
    return async (dispatch:Dispatch) => {
        let data = await getTasks_api()
        dispatch(setTasks(data))
    }
}

export const docDetailPage = (docitem:any,key:any) => {
    return {
        type:DOC_DETAIL,
        docitem,
        key
    }
}

export const add_task = (obj_t:any) => {
    return async (dispatch:Dispatch) => {
        await postTasks_api(obj_t)
        //dispatch(resetToHome())
        window.location.href="/"
    }
}

export const add_request = (obj_r:any,taskNum:any) => {
    return async(dispatch:Dispatch)=>{
        await postRequest_api(obj_r,taskNum)
        //dispatch(resetToHome())
        window.location.href="/"
        
    }
}

export const resetToHome = (): HomeActions => {
    return {
        type:RESET_HOME
    }
}

export const submission = (taskNum:string,reqNum:string) => {
    return async (dispatch:Dispatch) => {
        dispatch(loadingSubmission(true))
        let data = await submission_api(taskNum,reqNum)
        dispatch(setDocs(data))
    }
}

export const loadingSubmission = (val:boolean): HomeActions => {
    return{
        type: LOADING_SUBMISSION,
        val:val
}}

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

export const showEventsPage = (val:boolean): HomeActions => ({
    type:SHOW_EVENT,
    val
})

export const goBackDetails=():HomeActions => ({
    type:GOBACK_DETAILS
})

export const translateEnglish = (val:boolean):HomeActions => ({
    type:TRANSLATE_ENGLISH,
    val
})

export const showAllEvents = (val:boolean):HomeActions => ({
    type:SHOW_ALL_EVENTS,
    val
})

export const showAllEventGraph = (val:boolean):HomeActions => ({
    type:SHOW_ALL_EVENT_GRAPH,
    val
})

export const eventSummaryPage = (val:boolean):HomeActions => ({
    type:EVENT_SUMMARY,
    val
})
