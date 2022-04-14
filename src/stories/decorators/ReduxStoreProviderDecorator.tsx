//HOC- кмпонента, которая принимает другую компоненту и взвращает с новоей функциональностью
import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasksReducer";
import {todoListReducer} from "../../state/todoListReducer";
import {v1} from "uuid";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    TL: todoListReducer,

})
//Инициализационное значение для нашего сторибука
const initialGlobalState = {
    TL: [
        {id: 'tl1', title: 'tl1', filter: 'ALL'},
        {id: 'tl2', title: 'tl2', filter: 'ALL'},
    ],
    tasks: {
        'tl1':[
            {id: v1(), title: 'task1', isDone: true},
            {id: v1(), title: 'task2', isDone: false},
        ],
        'tl2':[
            {id: v1(), title: 'task3', isDone: true},
            {id: v1(), title: 'task4', isDone: false},
        ],
    }
}
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

// yarn add puppeteer jest-puppeteer jest-image-snapshot start-server-and-test --dev(тестирование компонент по скринам)


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {/*Обязательно нужно вызвать функцию, что бы она отрисовалась и сработала*/}
            {storyFn()}
        </Provider>
    );
};
