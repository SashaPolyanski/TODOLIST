import {setError, setStatus} from "../../b2-bll/reducers/appReducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../../b3-dal/todolistApi";

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