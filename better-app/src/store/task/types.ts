import { Action } from "redux";

export interface HomeState {
    tasks: any;
    c:number;
    task_set:boolean;
    add_task_screen:boolean;
}

export const SET_TASKS = "SET_TASKS"
export const DECREMENT = "DECREMENT"
export const ADD_TASK_CLICK = "ADD_TASK_CLICK"

export interface SetTasks extends Action {
    type: typeof SET_TASKS;
    tasks: any;
}

export interface DecrementAction extends Action {
    type: typeof DECREMENT;
}

export interface AddTaskClick extends Action {
    type: typeof ADD_TASK_CLICK
}

export type HomeActions = SetTasks | DecrementAction | AddTaskClick;
