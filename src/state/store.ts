import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListReducer} from "./todoListReducer";
import thunk from "redux-thunk";
import {appReducer} from "../app/appReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    TL: todoListReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type  AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;