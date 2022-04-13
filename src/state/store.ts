import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListReducer} from "./todoListReducer";


 const rootReducer = combineReducers({
    task: tasksReducer,
    TL: todoListReducer
})

export const store = createStore(rootReducer)

export type  AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;