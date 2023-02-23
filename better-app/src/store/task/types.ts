import { Action } from "redux";

export interface HomeState {
    tasks: any;
    loaderHome:boolean;
    add_task_screen:boolean;
    add_request_screen:boolean;
    task_click:string;
    docs:any;
    doc_table:any;
    show_doc_detail:boolean;
    docitem:any;
    subRes:any;
    task_select:number;
    searchResults:any;
    load_sub:boolean;
    doc_key:any;
    showEvent:boolean;
}

export const SET_TASKS = "SET_TASKS"
export const DECREMENT = "DECREMENT"
export const ADD_TASK_CLICK = "ADD_TASK_CLICK"
export const SELECT_TASK = "SELECT_TASK"
export const SET_DOCS = "SET_DOCS"
export const DOC_DETAIL="DOC_DETAIL"
export const ADD_REQUEST_CLICK="ADD_REQUEST_CLICK"
export const TASK_SELECTED="TASK_SELECTED"
export const RESET_HOME="RESET_HOME"
export const LOADING_SUBMISSION="LOADING_SUBMISSION"
export const LOADER_HOME="LOADER_HOME"
export const SHOW_EVENT = "SHOW_EVENT"
export const GOBACK_DETAILS="GOBACK_DETAILS"

export interface SetTasks extends Action {
    type: typeof SET_TASKS;
    tasks: any;
}

export interface SetDocs extends Action {
    type: typeof SET_DOCS;
    docs: any;
}

export interface DecrementAction extends Action {
    type: typeof DECREMENT;
}

export interface AddTaskClick extends Action {
    type: typeof ADD_TASK_CLICK;
    val: boolean;
}

export interface AddRequestClick extends Action {
    type: typeof ADD_REQUEST_CLICK;
    val: boolean;
}

export interface SelectTask extends Action {
    type: typeof SELECT_TASK;
    val: string
}

export interface DocDetail extends Action {
    type: typeof DOC_DETAIL;
    docitem: any;
    key:any;
}


export interface TaskSelected extends Action {
    type: typeof TASK_SELECTED;
    val:number
}

export interface ResetHome extends Action {
    type: typeof RESET_HOME;
}

export interface LoadingSubmission extends Action {
    type: typeof LOADING_SUBMISSION;
    val: boolean
}

export interface LoaderHome extends Action {
    type: typeof LOADER_HOME;
    val:boolean
}

export interface showEventPage extends Action {
    type: typeof SHOW_EVENT;
    val: boolean
}

export interface GoBackDetails extends Action {
    type: typeof GOBACK_DETAILS;
}

export type HomeActions = SetTasks 
                        | DecrementAction 
                        | AddTaskClick 
                        | SelectTask 
                        | SetDocs 
                        | DocDetail 
                        | AddRequestClick 
                        | TaskSelected
                        | ResetHome
                        | LoadingSubmission
                        | LoaderHome
                        | showEventPage
                        | GoBackDetails;
