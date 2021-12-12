import {Dispatch} from "redux";
import {authAPI} from "../API/todolists-api";
import {setIsLoggedInAC} from "../features/Login/login-reducer";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized:false,
}

export const appReducer = (state: InitialStateType= initialState, action: ActionAppType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default :
            return {...state}
    }
}

export const setErrorAC = (error: string|null)=>({
    type: 'APP/SET-ERROR', error
} as const)
export const setStatusAC = (status: RequestStatusType)=>({
    type: 'APP/SET-STATUS', status
} as const)
export const setAppInitializedAC = (isInitialized:boolean)=>({
    type: 'APP/SET-IS-INITIALIZED', isInitialized
} as const)


export const initializeAppTC = ()=> (dispatch:Dispatch)=>{
        authAPI.me()
            .then(res=>{
                if(res.data.resultCode===0){
                    dispatch(setIsLoggedInAC(true))
                } else {

                }
                dispatch(setAppInitializedAC(true))
            })
}


export type SetAppErrorType = ReturnType<typeof setErrorAC>
export type SetAppStatusType = ReturnType<typeof setStatusAC>
export type SetAppInitializedType = ReturnType<typeof setAppInitializedAC>
 type ActionAppType = SetAppErrorType | SetAppStatusType | SetAppInitializedType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'



export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean,
}