import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./reducers/tasksReducer";
import {todoListReducer} from "./reducers/todoListReducer";
import thunk from "redux-thunk";
import {appReducer} from "../components/task/appReducer";
import {authReducer} from "./reducers/LoginReducer";
import {switchThemeReducer} from "./reducers/themeReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    TL: todoListReducer,
    app: appReducer,
    auth: authReducer,
    theme: switchThemeReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type  AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;