import {FilterValueType, TlType} from "../App";
import {v1} from "uuid";



const initialState: Array<TlType> = []


export const todoListReducer = (state=initialState, action: ActionsType):Array<TlType> => {
    switch (action.type) {
        case 'REMOVE-TL' : {
            return state.filter(f => f.id !== action.payload.tlID1)
        }
        case 'ADD-TL' : {
            return [{id: action.payload.tlID, title: action.payload.title, filter: 'ALL'}, ...state]
        }
        case "RENAME-TL": {
            return state.map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
        }
        case "CHANGE-FILTER": {
            return state.map(m=>m.id === action.payload.id ? {...m, filter: action.payload.value} : m)
        }

        default:
            return state

    }
}


type ActionsType = RemoveTLAcType | AddTlAcType | ReNameAcType | ChangeFilterAcType
export type RemoveTLAcType = ReturnType<typeof RemoveTLAc>
export type AddTlAcType = ReturnType<typeof AddTlAc>
type ReNameAcType = ReturnType<typeof ReNameAc>
type ChangeFilterAcType = ReturnType<typeof ChangeFilterAc>

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
