import { v1 } from "uuid";
import {todolistsAPI, TodolistType} from "../API/todolists-api";
import { Dispatch } from "redux";


const initialState:Array<TodolistDomainType> = []


type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType= TodolistType & {
    filter: FilterValuesType
}




export const todolistsReducer = (state: Array<TodolistDomainType>= initialState, action: AllActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLIST': {
            return action.todolist.map(tl=>{
               return { ...tl, filter: 'all'}
            })
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
                }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.title = action.newTitle

            }
            return [...state]
            }
        case'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(t => t.id === action.todolistId);
            if (todolist) {
                todolist.filter = action.value;

            }
            return [...state]
        }
        default :
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    debugger
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    } as const
}
export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistId: v1()
    } as const
}
export const changeTodolistTitleAC = (newTitle: string,id: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        newTitle: newTitle,
        id: id
    } as const
}
export const changeTodolistFilterAC = (id: string,filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId: id,
        value: filter
    } as const
}

export const setTodolistAC = (todolist: Array<TodolistType>)=>{
    return {
        type: 'SET-TODOLIST',
        todolist:todolist,
    } as const
}


export const getTodolistsTC=()=>(dispatch:Dispatch)=>{
    debugger
    todolistsAPI.getTodolists()
        .then ((res)=> {
            let todolist = res.data
            dispatch(setTodolistAC(todolist))
        } )
    }
export const createTodolistsTC=(title:string)=>(dispatch:Dispatch)=>{
    debugger
    todolistsAPI.createTodolist(title)
        .then ((res)=> {
            let todolist = res.data.data.item.title
            dispatch(addTodolistAC(todolist))
        } )
}
export const deleteTodolistsTC=(todolistId:string)=>(dispatch:Dispatch)=>{
    debugger
    todolistsAPI.deleteTodolist(todolistId)
        .then ((res)=> {
            let todolist = res.data.data.id
            dispatch(removeTodolistAC(todolist))
        } )
}

export type SetTodolistType = ReturnType<typeof setTodolistAC>
export type removeTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export type AllActionType =
    removeTodolistType
    | AddTodolistType
    | ChangeTodolistType
    | ChangeTodolistFilterType
    | SetTodolistType