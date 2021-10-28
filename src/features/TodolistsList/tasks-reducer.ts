import { Dispatch } from "redux";
import {TasksStateType} from "../../app/App";
import {AddTodolistType, removeTodolistType, setTodolistAC, SetTodolistType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../API/todolists-api";
import {AppRootState} from "../../app/store";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: AllTasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id != action.id)
            }
        case 'ADD-TASK':
            return {
                ...state,
                    [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return{...state,[action.todolistId]:state[action.todolistId]
                    .map(t=>t.id===action.id ? {...t,  ...action.model} : t) }
        case 'ADD-TODOLIST':
           return { ...state,[action.todolist.id] : []  }

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case "SET-TODOLISTS":
            const stateCopy = {...state}
            action.todolist.forEach(t=>{
                stateCopy[t.id]=[]
            })
            return stateCopy
        case "SET-TASKS":
            return {...state,[action.todolistId]:action.tasks }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        id: taskId,
        todolistId: todolistId
    } as const
}
export const addTaskAC = (task:TaskType) => {
    return {
        type: 'ADD-TASK',
        task:task,
    } as const
}
export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {
        type: 'UPDATE-TASK',
        id: id,
        model: model,
        todolistId: todolistId
    } as const
}
export const setTasksAC = (tasks:Array<TaskType>, todolistId:string)=>{
    return {
        type:'SET-TASKS',
        tasks:tasks,
        todolistId:todolistId
    } as const
}



export const getTasksTC=(todolistId:string)=>(dispatch: Dispatch<AllTasksReducerType>)=> {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}
export const deleteTaskTC=(todolistId:string, taskId:string)=>(dispatch:Dispatch<AllTasksReducerType>)=> {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC(todolistId, taskId)
            dispatch(action)
        })
}
export const addTaskTC=(title:string,todolistId:string)=>(dispatch:Dispatch<AllTasksReducerType>)=> {
    todolistsAPI.createTask(title, todolistId)
        .then(res => {
            const task = res.data.data.item
            const action = addTaskAC(task)
            dispatch(action)
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}



export const updateTaskTC=(taskId:string, domainModel:UpdateDomainTaskModelType, todolistId:string)=>
    (dispatch:Dispatch<AllTasksReducerType>,getState:()=>AppRootState)=>{
    const state = getState();
    const task = state.tasks[todolistId].find(t=>t.id===taskId)
        if(!task){
            console.warn('task not found in the state')
            return;
        }
    const apiModel:UpdateTaskModelType={
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel,
    }
    return todolistsAPI.updateTask(todolistId,taskId,apiModel)
        .then(res=>{
            const action = updateTaskAC(taskId,domainModel,todolistId)
            dispatch(action)
        })
}

type AllTasksReducerType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistType
    | removeTodolistType
    | SetTodolistType
    |ReturnType<typeof setTasksAC>