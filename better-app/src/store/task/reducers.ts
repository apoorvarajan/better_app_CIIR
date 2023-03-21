import { HomeState, HomeActions, SET_TASKS, ADD_TASK_CLICK, SELECT_TASK, SET_DOCS, DOC_DETAIL, ADD_REQUEST_CLICK, 
    TASK_SELECTED, RESET_HOME, LOADING_SUBMISSION, LOADER_HOME, SHOW_EVENT, GOBACK_DETAILS, TRANSLATE_ENGLISH,
    SHOW_ALL_EVENTS, SHOW_ALL_EVENT_GRAPH, EVENT_SUMMARY } from "./types";

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
    showEvent:false,
    event_types:null,
    translate_english:false,
    showalle:false,
    showAllEventGraph:false,
    showEventSummary:false
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
            let hits = action.docs.searchResults.hits
            let event_list: any = []
            for(let i =0 ; i< hits.length;i++){
                for(let j=0; j<hits[i].events.length;j++){
                    if(!event_list.includes(hits[i].events[j].eventType)){
                        event_list.push(hits[i].events[j].eventType)
                    }
                }
            }
            let sR = action.docs.searchResults
            for(let i=0; i<action.docs.searchResults.hits.length; i++ ){
                sR.hits[i]['Rank']=i+1
            }
            return {...state, subRes:action.docs, searchResults:sR, load_sub:false, event_types:event_list}
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
        case TRANSLATE_ENGLISH:
            return { ...state, translate_english:action.val}
        case SHOW_ALL_EVENTS:
            return { ...state, showalle:action.val}
        case SHOW_ALL_EVENT_GRAPH:
            return { ...state, showAllEventGraph:action.val}
        case EVENT_SUMMARY:
            return { ...state, showEventSummary:action.val}
        default:
            return state;
    }
};

export default reducer;
