// //HOC- кмпонента, которая принимает другую компоненту и взвращает с новоей функциональностью
// import React from 'react';
// import {Provider} from "react-redux";
// import {AppRootStateType, store} from "../../state/store";
// import {combineReducers, createStore} from "redux";
// import {tasksReducer} from "../../state/tasksReducer";
// import {todoListReducer} from "../../state/todoListReducer";
// import {v1} from "uuid";
// import {TaskPriorities, TaskStatuses} from "../../api/todolistApi";
//
//
// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     TL: todoListReducer,
//
// })
// //Инициализационное значение для нашего сторибука
// const initialGlobalState = {
//     TL: [
//         {id: 'tl1', title: 'tl1', filter: 'ALL'},
//         {id: 'tl2', title: 'tl2', filter: 'ALL'},
//     ],
//     tasks: {
//         'tl1': [
//             {
//                 id: v1(), title: 'task1', status: TaskStatuses.Completed, todoListId: '',
//                 startDate: null,
//                 deadline: null,
//                 addedDate: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: null
//             },
//             {
//                 id: v1(), title: 'task2', status: TaskStatuses.Completed, todoListId: '',
//                 startDate: null,
//                 deadline: null,
//                 addedDate: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: null
//             },
//         ],
//         'tl2': [
//             {
//                 id: v1(), title: 'task3', status: TaskStatuses.Completed, todoListId: '',
//                 startDate: null,
//                 deadline: null,
//                 addedDate: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: null
//             },
//             {
//                 id: v1(), title: 'task4', status: TaskStatuses.Completed, todoListId: '',
//                 startDate: null,
//                 deadline: null,
//                 addedDate: '',
//                 order: 0,
//                 priority: TaskPriorities.Low,
//                 description: null
//             },
//         ],
//     }
// }
// // @ts-ignore
// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)
//
// // yarn add puppeteer jest-puppeteer jest-image-snapshot start-server-and-test --dev(тестирование компонент по скринам)
//
//
// export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
//     return (
//         <Provider store={storyBookStore}>
//             {/*Обязательно нужно вызвать функцию, что бы она отрисовалась и сработала*/}
//             {storyFn()}
//         </Provider>
//     );
// };


export default {}