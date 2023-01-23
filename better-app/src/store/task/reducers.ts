import { HomeState, HomeActions, SET_TASKS, DECREMENT } from "./types";
import { Action } from "redux";

const initialState: HomeState = {
    tasks:[],
    c:5,
    task_set: false
};

const reducer = (
    state: HomeState = initialState,
    action: HomeActions
): HomeState => {
    switch (action.type) {
        case SET_TASKS:
            return { ...state, tasks:action.tasks, task_set:true };
        case DECREMENT:
            return { ...state, c:state.c-1 };
        default:
            return state;
    }
};

export default reducer;
