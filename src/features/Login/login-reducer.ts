import {Dispatch} from "redux";
import {SetAppErrorType, SetAppStatusType, setStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../API/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: InitialType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialType = initialState, action: AllTasksReducerType): InitialType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        isLoggedIn: isLoggedIn,
    } as const
}


export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AllTasksReducerType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logOutTC = () => (dispatch: Dispatch<AllTasksReducerType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


type InitialType = {
    isLoggedIn: boolean
}

type AllTasksReducerType =
    ReturnType<typeof setIsLoggedInAC>
    | SetAppErrorType
    | SetAppStatusType