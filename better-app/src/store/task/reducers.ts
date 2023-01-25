import { HomeState, HomeActions, SET_TASKS, DECREMENT, ADD_TASK_CLICK } from "./types";
import { Action } from "redux";

const initialState: HomeState = {
    tasks:[],
    c:5,
    task_set: false,
    add_task_screen: false
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
        case ADD_TASK_CLICK:
            return { ...state, add_task_screen: true}
        default:
            return state;
    }
};

export default reducer;
