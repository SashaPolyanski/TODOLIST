import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListReducer} from "./todoListReducer";
import thunk from "redux-thunk";


 const rootReducer = combineReducers({
    tasks: tasksReducer,
    TL: todoListReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type  AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;