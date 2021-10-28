import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))


// @ts-ignore
window.store = store

