import { Action } from "redux";

export interface HomeState {
    tasks: any;
    c:number;
    task_set:boolean;
}

export const SET_TASKS = "SET_TASKS"
export const DECREMENT = "DECREMENT"

export interface SetTasks extends Action {
    type: typeof SET_TASKS;
    tasks: any;
}

export interface DecrementAction extends Action {
    type: typeof DECREMENT;
}

export type HomeActions = SetTasks | DecrementAction;
