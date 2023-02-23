import { HomeState, HomeActions, SET_TASKS, ADD_TASK_CLICK, SELECT_TASK, SET_DOCS, DOC_DETAIL, ADD_REQUEST_CLICK, 
    TASK_SELECTED, RESET_HOME, LOADING_SUBMISSION, LOADER_HOME, SHOW_EVENT, GOBACK_DETAILS } from "./types";

const initialState: HomeState = {
    tasks:[],
    loaderHome:false,
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
    load_sub:false,
    doc_key:null,
    showEvent:false
};

const reducer = (
    state: HomeState = initialState,
    action: HomeActions
): HomeState => {
    switch (action.type) {
        case LOADER_HOME:
            return { ...state, loaderHome:action.val}
        case SET_TASKS:
            return { ...state, tasks:action.tasks, loaderHome:false };
        case ADD_TASK_CLICK:
            return { ...state, add_task_screen: action.val}
        case ADD_REQUEST_CLICK:
            return { ...state, add_request_screen: action.val}
        case SELECT_TASK:
            return {...state, task_click:action.val}
        case DOC_DETAIL:
            return {...state, show_doc_detail:true,docitem:action.docitem,doc_key:action.key}
        case SET_DOCS:
            return {...state, subRes:action.docs, searchResults:action.docs.searchResults, load_sub:false}
        case TASK_SELECTED:
            return {...state,task_select:action.val === state.task_select?-1:action.val}
        case RESET_HOME:
            return {...state, add_request_screen:false, add_task_screen:false, task_select:-1}
        case LOADING_SUBMISSION:
            return {...state, load_sub:action.val}
        case SHOW_EVENT:
             return { ...state, showEvent:action.val}
        case GOBACK_DETAILS:
            return { ...state, show_doc_detail:false,docitem:null,doc_key:null}
        default:
            return state;
    }
};

export default reducer;
