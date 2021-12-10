import {SetAppErrorType, SetAppStatusType, setErrorAC, setStatusAC} from "../app/app-reducer";
import {ResponseType, TaskType} from '../API/todolists-api'
import {Dispatch} from "redux";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorType | SetAppStatusType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}


export const handleServerNetworkError = (error: {message:string}, dispatch: Dispatch<SetAppErrorType | SetAppStatusType>) => {
    dispatch(setErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setStatusAC('failed'))
}
