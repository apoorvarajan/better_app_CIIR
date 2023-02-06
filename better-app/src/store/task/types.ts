import { Action } from "redux";

export interface HomeState {
    tasks: any;
    c:number;
    task_set:boolean;
    add_task_screen:boolean;
    task_click:string;
    docs:any;
    doc_table:any;
    show_doc_detail:boolean;
    docNum:any;
}

export const SET_TASKS = "SET_TASKS"
export const DECREMENT = "DECREMENT"
export const ADD_TASK_CLICK = "ADD_TASK_CLICK"
export const SELECT_TASK = "SELECT_TASK"
export const SET_DOCS = "SET_DOCS"
export const DOC_DETAIL="DOC_DETAIL"

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
    type: typeof ADD_TASK_CLICK
}

export interface SelectTask extends Action {
    type: typeof SELECT_TASK;
    val: string
}

export interface DocDetail extends Action {
    type: typeof DOC_DETAIL;
    docNum: any
}

export type HomeActions = SetTasks | DecrementAction | AddTaskClick | SelectTask | SetDocs | DocDetail;
