import { HomeState, HomeActions, SET_TASKS, DECREMENT, ADD_TASK_CLICK, SELECT_TASK, SET_DOCS, DOC_DETAIL } from "./types";

const initialState: HomeState = {
    tasks:[],
    c:5,
    task_set: false,
    add_task_screen: false,
    task_click:'',
    docs:null,
    doc_table:[],
    show_doc_detail:false,
    docNum:null
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
        case SELECT_TASK:
            return {...state, task_click:action.val}
        case DOC_DETAIL:
            return {...state, show_doc_detail:true,docNum:action.docNum}
        case SET_DOCS:
            let doc=action.docs;
            let doc_table_sample: any = []
            doc && doc.reqExampleDocs && doc.reqExampleDocs.map((item:any,key:any)=>{
                        item.sentences && item.sentences.map((item2:any,key2:any)=>{
                                    doc_table_sample.push( {
                                        'text':item2.text,
                                        'docNum':item.docNumber,
                                        'id':item2.id
                                    })
                        })})
            return {...state, docs:action.docs, doc_table:doc_table_sample}
        default:
            return state;
    }
};

export default reducer;
