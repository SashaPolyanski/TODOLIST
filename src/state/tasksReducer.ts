import {TasksStateType} from "../Todolist";
import {AddTlAcType, RemoveTLAcType, setEntityStatus, SetTodosType} from "./todoListReducer";
import {Dispatch} from "redux";
import {tasksApi, TaskStatuses, UpdateTaskModelType} from "../api/todolistApi";
import {AppRootStateType} from "./store";
import {setError, setStatus} from "../app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils";


export type TasksType = {
    addedDate: string
    deadline: null
    description: null
    id: string
    order: number
    priority: number
    startDate: null
    status: number
    title: string
    todoListId: string
}

type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTlAcType
    | RemoveTLAcType
    | SetTodosType
    | ReturnType<typeof GetTasksAc>
    | ReturnType<typeof UpdateTaskAc>


const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "GET-TASKS": {
            // let stateCopy = {...state}
            // stateCopy[action.tlID] = action.tasks
            // return stateCopy
            return {
                ...state, [action.tlID]: action.tasks
            }
        }
        case "SET-TODOS": {
            //Делаем для того, что бы убрать undefined при получениее тасок, что бы проект нормально отрисавался
            let stateCopy = {...state}
            action.todos.forEach(m => stateCopy[m.id] = []
            )
            return stateCopy
        }
        case 'REMOVE-TASK' : {
            return {
                //Возвращаем объект
                ...state,
                //Берем его свойство и перезатираем новым с удаленной таской
                [action.tlID]: state[action.tlID].filter(t => t.id !== action.id)
            }
        }
        case 'ADD-TASK': {
            // let newTask: TasksType = {
            //     id: v1(),
            //     title: action.title,
            //     status: 1,
            //     addedDate: '',
            //     deadline: null,
            //     description: null,
            //     order: 1,
            //     startDate: null,
            //     priority: 1,
            //     todoListId: ''
            // }
            //
            // let copyState = {...state}
            // const task = copyState[action.task.todoListId]
            // const newTasks = [action.task, ...task]
            // copyState[action.task.todoListId] = newTasks
            // return copyState
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}


        }
        case 'UPDATE-TASK' : {
            return {
                ...state,
                [action.tlID]: state[action.tlID].map(m => m.id === action.taskID ? {...m, ...action.model} : m)
            }

        }
        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state,
                [action.tlID]: state[action.tlID].map(m => m.id === action.id ? {...m, status: action.status} : m)
            }
        }
        case "CHANGE-TASK-TITLE" : {
            return {
                ...state,
                [action.tlID]: state[action.tlID].map(m => m.id === action.id ? {...m, title: action.title} : m)
            }
        }
        case "ADD-TL": {
            return {
                ...state,
                [action.payload.tlId]: []
            }
        }
        case "REMOVE-TL": {
            let copy = {...state}
            delete copy[action.payload.tlID]
            return copy

        }

        default:
            return state
    }

}

export const removeTaskAC = (id: string, tlID: string) => {
    return {
        type: 'REMOVE-TASK', id, tlID

    } as const
}
export const addTaskAC = (task: TasksType) => {
    return {
        type: 'ADD-TASK', task
    } as const
}
export const changeTaskStatusAC = (tlID: string, id: string, status: TaskStatuses) => {
    return {
        type: "CHANGE-TASK-STATUS", tlID, id, status
    } as const
}
export const changeTaskTitleAC = (tlID: string, id: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE', tlID, id, title
    } as const
}

export const GetTasksAc = (tlID: string, tasks: TasksType[]) => {
    return {
        type: 'GET-TASKS',
        tlID,
        tasks
    } as const
}
export const UpdateTaskAc = (tlID: string, taskID: string, model: UpdateTaskModelType) => {
    return {
        type: 'UPDATE-TASK',
        tlID,
        taskID,
        model
    } as const
}


//thunk
export const FetchTasksThunkCreator = (tlId: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    tasksApi.getTasks(tlId)
        .then((res) => {
            dispatch(GetTasksAc(tlId, res.data.items))
            dispatch(setStatus('succeeded'))
        })
}
export const RemoveTaskThunkCreator = (id: string, tlID: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(tlID, id)
        .then((res) => {
            dispatch(removeTaskAC(id, tlID))
        })
}
export const AddTaskThunkCreator = (tlId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    dispatch(setEntityStatus(tlId, 'loading'))
    tasksApi.createTask(tlId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setStatus('succeeded'))
                dispatch(setEntityStatus(tlId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }


        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}
export const UpdateTaskTC = (tlId: string, taskId: string, model: UpdateTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setEntityStatus(tlId, 'loading'))
    const allTask = getState().tasks
    const TasksForTodo = allTask[tlId]
    const currentTask = TasksForTodo.find(f => f.id === taskId)
    if (currentTask) {
        const apiModel: UpdateTaskModelType = {
            title: currentTask.title,
            status: currentTask.status,
            startDate: currentTask.startDate,
            priority: currentTask.priority,
            deadline: currentTask.deadline,
            description: currentTask.description,
            ...model
        }

        tasksApi.updateTask(tlId, taskId, apiModel)

            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(UpdateTaskAc(tlId, taskId, apiModel))
                    dispatch(setEntityStatus(tlId, 'succeeded'))
                } else {
                    //что бы не дублировать код, нам нужно часть кода засунуть в функцию
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

//Уточнить на саппорте про изменение таски (чекбокса и тайтла) в одной функции. Через приходящий model
//В теории принимаем целый model и меняем, надо будет уточнить


