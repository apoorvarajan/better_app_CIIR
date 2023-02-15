import { HomeState, HomeActions, SET_TASKS, DECREMENT, ADD_TASK_CLICK, SELECT_TASK, SET_DOCS, DOC_DETAIL, ADD_REQUEST_CLICK, TASK_SELECTED, RESET_HOME, LOADING_SUBMISSION } from "./types";

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
    docitem:null,
    subRes:null,
    task_select:-1,
    searchResults:null,
    sR_page:0,
    load_sub:false
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
            return {...state, show_doc_detail:true,docitem:action.docitem}
        case SET_DOCS:
            return {...state, subRes:action.docs, searchResults:action.docs.searchResults, sR_page:10,  load_sub:false}
        case TASK_SELECTED:
            return {...state,task_select:action.val === state.task_select?-1:action.val}
        case RESET_HOME:
            return {...state, add_request_screen:false, add_task_screen:false, task_select:-1}
        case LOADING_SUBMISSION:
            return {...state, load_sub:action.val}
        default:
            return state;
    }
};

export default reducer;
