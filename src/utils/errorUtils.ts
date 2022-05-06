import {setError, setStatus} from "../app/appReducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../api/todolistApi";

export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    }else {
        dispatch(setError('Some error occurred'))
    }
    dispatch(setStatus('failed'))
}
export const handleServerNetworkError = (error: any, dispatch: Dispatch) => {
    dispatch(setError(error.message ? error.message : 'some error'))
    dispatch(setStatus('failed'))
}

export {}