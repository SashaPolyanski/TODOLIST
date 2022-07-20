import {Dispatch} from 'redux'
import {isInitializedAc, setStatus} from './appReducer'
import {authAPI, LoginParamsType} from "../../a1-main/b3-dal/todolistApi";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: ''
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        },
        setEmail(state, action: PayloadAction<{ email: string }>) {
            state.email = action.payload.email
        }

    }

})


export const authReducer = slice.reducer
export const {setIsLoggedIn, setEmail} = slice.actions
// (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         case "login/SET-EMAIL":
//             return {...state, email: action.email}
//         default:
//             return state
//     }
// }
// actions
// export const setEmail = (email: string) => {
//     return {
//         type: 'login/SET-EMAIL',
//         email
//     } as const
// }
// thunks
export const loginThunk = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    authAPI.login(data)

        .then((res) => {
            debugger
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: true}))
                dispatch(setStatus({status: 'succeeded'}))
                dispatch(setEmail({email: data.email}))
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
                dispatch(setIsLoggedIn({value: false}));
                dispatch(setStatus({status: 'succeeded'}))

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
                dispatch(setIsLoggedIn({value: true}));
                dispatch(setStatus({status: 'succeeded'}))

            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(isInitializedAc({isInitialized: true}))
        })

}


// types
