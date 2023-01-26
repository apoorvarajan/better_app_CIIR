import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import logger from "redux-logger";

import reducers from "./task/reducers";
import { HomeState } from "./task/types";

export interface State {
    tasks: any;
    c: number;
    task_set:boolean;
    add_task_screen:boolean;
    task_click:string
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
