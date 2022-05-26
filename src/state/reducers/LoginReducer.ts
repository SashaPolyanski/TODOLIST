import {Dispatch} from 'redux'
import {AppStatus, ErrorType, isInitializedAc, isInitializedType, setStatus} from '../../components/task/appReducer'
import {authAPI, LoginParamsType} from "../../api/todolistApi";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";

const initialState = {
    isLoggedIn: false,
    email: ''
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case "login/SET-EMAIL":
            return {...state, email: action.email}
        default:
            return state
    }
}
// actions
export const setIsLoggedIn = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}
export const setEmail = (email: string) => {
    return {
        type: 'login/SET-EMAIL',
        email
    } as const
}
// thunks
export const loginThunk = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(setStatus('succeeded'))
                dispatch(setEmail(data.email))
            } else {
                handleServerAppError(res.data, dispatch)
            }


        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })


}

export const logoutThunk = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false));
                dispatch(setStatus('succeeded'))

            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })

}
export const initializeAppThunk = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true));
                dispatch(setStatus('succeeded'))

            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(isInitializedAc(true))
        })

}


// types
type ActionsType =
    ReturnType<typeof setIsLoggedIn>
    | AppStatus
    | ErrorType
    | isInitializedType
    | ReturnType<typeof setEmail>