export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    entityStatus: RequestStatusType
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    status: "idle",
    error: null,
    entityStatus: 'idle'
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        default:
            return {...state}
    }
}
export const setError = (error: string | null) => {
    return{
        type: 'APP/SET-ERROR',
        error
    } as const
}
export const setStatus = (status:RequestStatusType ) => {
    return{
        type: 'APP/SET-STATUS',
        status
    } as const
}


type ActionsType = ReturnType<typeof setError> | ReturnType<typeof setStatus>














