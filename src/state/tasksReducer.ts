import {TasksStateType} from "../Todolist";
import {v1} from "uuid";
import {AddTlAcType, RemoveTLAcType} from "./todoListReducer";


type ActionsType = RemoveTaskType | addTaskType | changeTaskStatus | changeTaskTitle | AddTlAcType | RemoveTLAcType
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
    id:string
    isDone: boolean
}
type changeTaskTitle = {
    type: 'CHANGE-TASK-TITLE'
    tlID: string
    id: string
    title: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state= initialState, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                //Возвращаем объект
                ...state,
                //Берем его свойство и перезатираем новым с удаленной таской
                [action.tlID]: state[action.tlID].filter(t => t.id !== action.id)
            }
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.tlID]: [newTask, ...state[action.tlID]]

            }
        }
        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state,
                [action.tlID]:state[action.tlID].map(m=>m.id === action.id ? {...m,isDone: action.isDone} : m)
            }
        }
        case "CHANGE-TASK-TITLE" : {
            return {
                ...state,
                [action.tlID]: state[action.tlID].map(m=>m.id === action.id ? {...m, title: action.title} : m)
            }
        }
        case "ADD-TL": {
            return {
                ...state,
                [action.payload.tlID]:[]
            }
        }
        case "REMOVE-TL": {
            let copy = {...state}
            delete copy[action.payload.tlID1]
            return copy

        }
        default: return state
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
export const changeTaskStatusAC = (tlID: string, id: string, isDone: boolean): changeTaskStatus => {
    return {
        type: "CHANGE-TASK-STATUS", tlID,id,isDone
    }
}
export const changeTaskTitleAC = (tlID: string, id: string, title: string): changeTaskTitle=> {
    return {
        type:'CHANGE-TASK-TITLE', tlID,id,title
    }
}
