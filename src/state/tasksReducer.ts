import {TasksStateType} from "../Todolist";
import {v1} from "uuid";
import {AddTlAcType, RemoveTLAcType, SetTodosType} from "./todoListReducer";
import {Dispatch} from "redux";
import {tasksApi, TaskStatuses} from "../api/todolistApi";


type ActionsType =
    RemoveTaskType
    | addTaskType
    | changeTaskStatus
    | changeTaskTitle
    | AddTlAcType
    | RemoveTLAcType
    | SetTodosType
    | SetTasksType
type RemoveTaskType = {
    type: 'REMOVE-TASK'
    id: string
    tlID: string
}
type addTaskType = {
    type: 'ADD-TASK'
    title: string
    tlID: string
}
type changeTaskStatus = {
    type: 'CHANGE-TASK-STATUS'
    tlID: string
    id: string
    status: TaskStatuses
}
type changeTaskTitle = {
    type: 'CHANGE-TASK-TITLE'
    tlID: string
    id: string
    title: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "GET-TASKS": {
            debugger
            let stateCopy = {...state}
            debugger
            stateCopy[action.tlID] = action.tasks
            return stateCopy
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
            let newTask: TasksType = {
                id: v1(),
                title: action.title,
                status: 1,
                addedDate: '',
                deadline: null,
                description: null,
                order: 1,
                startDate: null,
                priority: 1,
                todoListId: ''
            }
            return {
                ...state,
                [action.tlID]: [newTask, ...state[action.tlID]]
            }
        }
        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state,
                [action.tlID]: state[action.tlID].map(m => m.id === action.id ? {...m, isDone: action.status} : m)
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
                [action.payload.tlID]: []
            }
        }
        case "REMOVE-TL": {
            let copy = {...state}
            delete copy[action.payload.tlID1]
            return copy

        }
        default:
            return state
    }

}

export const removeTaskAC = (id: string, tlID: string): RemoveTaskType => {
    return {
        type: 'REMOVE-TASK', id, tlID

    }
}
export const addTaskAC = (title: string, tlID: string): addTaskType => {
    return {
        type: 'ADD-TASK', title, tlID
    }
}
export const changeTaskStatusAC = (tlID: string, id: string, status: TaskStatuses): changeTaskStatus => {
    return {
        type: "CHANGE-TASK-STATUS", tlID, id, status
    }
}
export const changeTaskTitleAC = (tlID: string, id: string, title: string): changeTaskTitle => {
    return {
        type: 'CHANGE-TASK-TITLE', tlID, id, title
    }
}
export const GetTasksAc = (tlID: string, tasks: TasksType[]) => {
    return {
        type: 'GET-TASKS',
        tlID,
        tasks
    } as const
}
type SetTasksType = ReturnType<typeof GetTasksAc>
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

//thunk
export const fetchTasksThunkCreator = (tlId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(tlId)
        .then((res) => {
            dispatch(GetTasksAc(tlId, res.data.items))
        })
}
export const RemoveTaskThunkCreator = (id: string, tlID: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(tlID, id)
        .then((res)=>{
            dispatch(removeTaskAC(id, tlID))
        })
}

