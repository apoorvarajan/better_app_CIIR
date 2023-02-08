import { HomeState, HomeActions, SET_TASKS, DECREMENT, ADD_TASK_CLICK, SELECT_TASK, SET_DOCS, DOC_DETAIL, ADD_REQUEST_CLICK, TASK_SELECTED } from "./types";

const initialState: HomeState = {
    tasks:[],
    c:5,
    task_set: false,
    add_task_screen: false,
    add_request_screen: false,
    task_click:'',
    docs:null,
    doc_table:[],
    show_doc_detail:false,
    docNum:null,
    subRes:null,
    task_select:-1
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
            return { ...state, add_task_screen: action.val}
        case ADD_REQUEST_CLICK:
            return { ...state, add_request_screen: action.val}
        case SELECT_TASK:
            return {...state, task_click:action.val}
        case DOC_DETAIL:
            return {...state, show_doc_detail:true,docNum:action.docNum}
        case SET_DOCS:
            return {...state, subRes:action.docs}
        case TASK_SELECTED:
            return {...state,task_select:action.val === state.task_select?-1:action.val}
        default:
            return state;
    }
};

export default reducer;
