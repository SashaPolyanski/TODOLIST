// import React, {useEffect, useState} from 'react'
// import {tasksApi, todolistApi} from "../api/todolistApi";
//
// export default {
//     title: 'API'
// }
//
// export const GetTodolists = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todolistApi.getTodos()
//             .then((res) => {
//                 setState(res.data)
//             })
//         // здесь мы будем делать запрос и ответ закидывать в стейт.
//         // который в виде строки будем отображать в div-ке
//
//     }, [])
//     return <div>{JSON.stringify(state)}</div>
// }
// export const CreateTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     let title = 'TODOLIST2'
//     useEffect(() => {
//         todolistApi.createTodo(title)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }
// export const DeleteTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todolistApi.getTodos()
//             .then((res) => {
//                 return res
//
//             })
//             .then((res) => {
//                 todolistApi.deleteTodo(res.data[0].id)
//                     .then((res) => {
//                         setState(res.data)
//                     })
//
//             })
//
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }
// export const UpdateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//     let title = 'NEWTODOTITLE'
//     useEffect(() => {
//         todolistApi.getTodos()
//             .then((res) => {
//                 return res
//             })
//             .then((res) => {
//                 todolistApi.updateTodoTitle(res.data[0].id, title)
//                     .then((res) => {
//                         setState(res.data)
//                     })
//             })
//
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }
// export const GetTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todolistApi.getTodos()
//             .then((res) => {
//                 return res
//             })
//             .then((res) => {
//                 tasksApi.getTasks(res.data[0].id)
//                     .then((res) => {
//                         setState(res.data)
//                     })
//
//             })
//     }, [])
//     return <div>{JSON.stringify(state)}</div>
// }
// export const CreateTask = () => {
//     const [state, setState] = useState<any>(null)
//     let title = 'EIBERUNGERNUERGOGNWWOGNGRONRGONRGWEOGEOUGOWGUOUG'
//     useEffect(() => {
//         todolistApi.getTodos()
//             .then((res) => {
//                 return res
//             })
//             .then((res) => {
//                 tasksApi.createTask(res.data[0].id, title)
//                     .then((res) => {
//                         setState(res.data)
//                     })
//             })
//     }, [])
//     return <div>{JSON.stringify(state)}</div>
// }
// export const DeleteTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todolistApi.getTodos()
//             .then((res) => {
//                 return res
//             })
//             .then((res) => {
//                 tasksApi.getTasks(res.data[0].id)
//                     .then((data) => {
//                         setState(data.data)
//                         console.log(data.data)
//                         return {res, data}
//                     })
//                     .then((all) => {
//                         tasksApi.deleteTask(all.res.data[0].id, all.data.data.items[0].id).then(res => setState(res.data))
//                     })
//
//             })
//     }, [])
//     return <div>{JSON.stringify(state)}</div>
// }
// export const UpdateTaskTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todolistApi.getTodos()
//             .then((res) => {
//                 return res
//             })
//             .then((res) => {
//
//                 tasksApi.getTasks(res.data[0].id)
//                     .then((data) => {
//                         setState(data.data)
//                         return {res, data}
//                     })
//                     .then((all) => {
//                         tasksApi.updateTaskTitle(all.res.data[0].id, all.data.data.items[0].id, '111')
//                             .then((res) => {
//                                 setState(res.data)
//                             })
//                     })
//             })
//     }, [])
// }
export default {}