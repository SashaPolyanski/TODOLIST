import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {todolistApi} from "../api/todolistApi";
import {RequestStatusType, setStatus} from "../app/appReducer";


const initialState: Array<TodolistDomainType> = []


export const todoListReducer = (state = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOS":
            return action.todos.map(t => ({...t, filter: 'ALL', entityStatus: 'idle'}))

        case 'REMOVE-TL' :
            return state.filter(f => f.id !== action.payload.tlID)
        case "APP/SET-ENTITY-STATUS":
            return state.map(f=>f.id === action.id ? {...f,entityStatus: action.entity} : f)

        case 'ADD-TL' :
            return [{
                id: action.payload.tlId,
                title: action.payload.title,
                filter: 'ALL',
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            }, ...state]

        case "RENAME-TL":
            return state.map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)

        case "CHANGE-FILTER":
            return state.map(m => m.id === action.payload.id ? {...m, filter: action.payload.value} : m)


        default:
            return state

    }
}

//types
type ActionsType =
    ReturnType<typeof RemoveTLAc> |
    ReturnType<typeof AddTlAc> |
    ReturnType<typeof ReNameAc> |
    ReturnType<typeof ChangeFilterAc> |
    ReturnType<typeof SetTodosAc> |
    ReturnType<typeof setEntityStatus>
export type RemoveTLAcType = ReturnType<typeof RemoveTLAc>
export type AddTlAcType = ReturnType<typeof AddTlAc>
export type SetTodosType = ReturnType<typeof SetTodosAc>
export type FilterValueType = 'ALL' | 'COMPLETED' | 'ACTIVE'
export type TodolistDomainType = TodosType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}


//Actions create
export const RemoveTLAc = (tlID: string) => {
    return {
        type: 'REMOVE-TL',
        payload: {
            tlID
        }
    } as const
}
export const AddTlAc = (title: string, tlId: string) => {
    return {
        type: 'ADD-TL',
        payload: {
            title,
            tlId
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
export const setEntityStatus = (id: string, entity: RequestStatusType) => {
    return {
        type: 'APP/SET-ENTITY-STATUS',
        id,
        entity

    } as const
}


//thunk, thunk принимает в себя первым параметром dispatch, вторым параметром принимает в себя getState, третий - экстра аргументы
//thunk предназначен для side effect, dispatch action
export const FetchTodosThunkCreator = () => (dispatch: Dispatch, getState: AppRootStateType) => {
    dispatch(setStatus('loading'))
    todolistApi.getTodos()
        .then((res) => {
            dispatch(SetTodosAc(res.data))
            dispatch(setStatus('succeeded'))
        })

}
export const CreateTodoThunkCreator = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))

    todolistApi.createTodo(title)
        .then((res) => {
            //Что бы не было конфликта id на сервере и в стейте, мы с стейт должны засетать ту id, которая пришла с сервера
            //Генерировать id с помощью v1() нет смысла, на сервере будет одна, в стейте другая
            dispatch(AddTlAc(title, res.data.data.item.id))
            dispatch(setStatus('succeeded'))
        })

}
export const RemoveTodoThunkCreator = (tlId: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    dispatch(setEntityStatus(tlId,'loading'))
    todolistApi.deleteTodo(tlId)
        .then(() => {
            dispatch(RemoveTLAc(tlId))
            dispatch(setStatus('succeeded'))
            dispatch(setEntityStatus(tlId,'succeeded'))
        })
}
export const ChangeTodoTitleThunkCreator = (tlId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatus('loading'))
    todolistApi.updateTodoTitle(tlId, title)
        .then((res) => {
            dispatch(ReNameAc(tlId, title))
            dispatch(setStatus('succeeded'))
        })
}