import {todolistsAPI, TodolistType} from "../../API/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC, SetStatusType} from "../../app/app-reducer";


const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: AllActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolist.map(tl => ({...tl, filter: 'all', entityStatus:'idle'}))
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all',entityStatus:'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        case'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl)
        default :
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId
    } as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    } as const
}
export const changeTodolistTitleAC = (id: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        newTitle: newTitle,
        id: id
    } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId: id,
        value: filter
    } as const
}
export const setTodolistAC = (todolist: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLISTS',
        todolist: todolist,
    } as const
}


export const getTodolistsTC = () => (dispatch: Dispatch<AllActionType>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then((res) => {
            let todolist = res.data
            dispatch(setTodolistAC(todolist))
            dispatch(setStatusAC('succeeded'))
        })
}
export const createTodolistsTC = (title: string) => (dispatch: Dispatch<AllActionType>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            let todolist = res.data.data.item
            dispatch(addTodolistAC(todolist))
            dispatch(setStatusAC('succeeded'))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<AllActionType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<AllActionType>) => {
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}


export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type removeTodolistType = ReturnType<typeof removeTodolistAC>
export type SetTodolistType = ReturnType<typeof setTodolistAC>

export type AllActionType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>
    | SetStatusType


type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}