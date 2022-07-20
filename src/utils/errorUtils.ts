import {setError, setStatus} from "../state/reducers/appReducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../a1-main/b3-dal/todolistApi";

export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setError({error:data.messages[0]}))
    }else {
        dispatch(setError({error: 'Some error occurred'}))
    }
    dispatch(setStatus({status: 'failed'}))
}
export const handleServerNetworkError = (error: any, dispatch: Dispatch) => {
    dispatch(setError(error.message ? error.message : 'some error'))
    dispatch(setStatus({status: 'failed'}))
}

export {}