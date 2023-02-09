import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";

import reducers from "./task/reducers";

export interface State {
    tasks: any;
    c: number;
    task_set:boolean;
    add_task_screen:boolean;
    add_request_screen: false,
    task_click:string;
    docs:any;
    doc_table:any;
    show_doc_detail:boolean;
    docNum:any;
    subRes:any;
    task_select:number;
    searchResults:any;
    sR_page:number;
    load_sub:boolean
}

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState?: State) =>
    createStore(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(logger))
    );

const store = configureStore();

export default store;
