import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./reducers/tasksReducer";
import thunk from "redux-thunk";
import {appReducer} from "./reducers/appReducer";
import {authReducer} from "./reducers/LoginReducer";
import {todolistReducer} from "./reducers/todoListReducer"
import {switchThemeReducer} from "./reducers/themeReducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    TL: todolistReducer,
    app: appReducer,
    auth: authReducer,
    theme: switchThemeReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))

export type  AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;