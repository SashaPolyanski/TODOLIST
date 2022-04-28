import {v1} from "uuid";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {todolistApi} from "../api/todolistApi";

export type FilterValueType = 'ALL' | 'COMPLETED' | 'ACTIVE'

export type TodolistDomainType = TodosType & {
    filter: FilterValueType
}


const initialState: Array<TodolistDomainType> = []


export const todoListReducer = (state = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOS": {
            return action.todos.map(t => {

                return {...t, filter: 'ALL'}

            })

        }
        case 'REMOVE-TL' : {
            return state.filter(f => f.id !== action.payload.tlID1)
        }
        case 'ADD-TL' : {
            return [{id: action.payload.tlID, title: action.payload.title, filter: 'ALL' , addedDate: '', order: 0}, ...state]
        }
        case "RENAME-TL": {
            return state.map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
        }
        case "CHANGE-FILTER": {
            return state.map(m => m.id === action.payload.id ? {...m, filter: action.payload.value} : m)
        }

        default:
            return state

    }
}


type ActionsType = RemoveTLAcType | AddTlAcType | ReNameAcType | ChangeFilterAcType | SetTodosType
export type RemoveTLAcType = ReturnType<typeof RemoveTLAc>
export  type AddTlAcType = ReturnType<typeof AddTlAc>
type ReNameAcType = ReturnType<typeof ReNameAc>
type ChangeFilterAcType = ReturnType<typeof ChangeFilterAc>
export type SetTodosType = ReturnType<typeof SetTodosAc>

export const RemoveTLAc = (tlID1: string) => {
    return {
        type: 'REMOVE-TL',
        payload: {
            tlID1
        }
    } as const
}
export const AddTlAc = (title: string) => {
    return {
        type: 'ADD-TL',
        payload: {
            title,
            tlID: v1()
        }
    } as const
}
export const ReNameAc = (id: string, title: string) => {
    return {
        type: 'RENAME-TL',
        payload: {
            id,
            title
        }
    } as const
}
export const ChangeFilterAc = (id: string, value: FilterValueType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            id,
            value
        }
    } as const
}
//Добавляем as const, что бы типизация typeof , ReturnType воспринимаю type, как константу, а не простую строку
//Желательно Ac лучше типизировать через ReturnType
export type TodosType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export const SetTodosAc = (todos: Array<TodosType>) => {
    return {
        type: 'SET-TODOS',
        todos
    } as const

}


//thunk, thunk принимает в себя первым параметром dispatch, вторым параметром принимает в себя getState, третий - экстра аргументы
//thunk предназначен для side effect, dispatch action
export const fetchTodosThunk = (dispatch: Dispatch, getState: AppRootStateType) => {
    todolistApi.getTodos()
        .then((res) => {
            dispatch(SetTodosAc(res.data))
        })
}

