import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    entityStatus: RequestStatusType
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    status: "idle",
    error: null,
    entityStatus: 'idle',
    isInitialized: false
}


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        isInitializedAc(state, action: PayloadAction<{isInitialized: boolean}>){
            state.isInitialized = action.payload.isInitialized
        }
    }

})
export const appReducer = slice.reducer
export const {setStatus, setError, isInitializedAc} = slice.actions

// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case "APP/IS-INITIALIZED":
//             return {...state, isInitialized: action.isInitialized}
//
//         default:
//             return {...state}
//     }
// }
// export const setError = (error: string | null) => {
//     return{
//         type: 'APP/SET-ERROR',
//         error
//     } as const
// }
// export const setStatus = (status:RequestStatusType ) => {
//     return{
//         type: 'APP/SET-STATUS',
//         status
//     } as const
// }
// export const isInitializedAc = (isInitialized: boolean) => {
//     return {
//         type: 'APP/IS-INITIALIZED',
//         isInitialized
//
//     } as const
// }
