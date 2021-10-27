import { Dispatch } from "redux";
import {v1} from "uuid";
import {TasksStateType} from "../AppWithRedux";
import {AddTodolistType, removeTodolistType, setTodolistAC, SetTodolistType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../API/todolists-api";
import {AppRootState} from "./store";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: AllTasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id != action.id);

            return {...state}
        }
        case 'ADD-TASK': {
            debugger
            let task = action.task;

            let todolistTasks = state[action.task.todoListId];

            state[action.task.todoListId] = [task, ...todolistTasks,]

            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.id ? {...t, status: action.status} : t);
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy= {...state}
            let todolistTasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = todolistTasks.map(t=> t.id===action.id ? {...t, title: action.newTitle}: t)

            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}

            stateCopy[action.todolist.id] = []

            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolist.forEach(t=>{
                stateCopy[t.id]=[]
            })
            return stateCopy
        }
        case "SET-TASKS": {
             const stateCopy={...state}
            stateCopy[action.todolistId]=action.tasks

            return stateCopy
        }
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
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id: id,
        status: status,
        todolistId: todolistId
    } as const
}
export const changeTaskNameAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id: id,
        newTitle: newTitle,
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



export const getTasksTC=(todolistId:string)=>(dispatch: Dispatch)=>{
    return todolistsAPI.getTasks(todolistId)
        .then((res)=>{
            let tasks = res.data.items
            dispatch(setTasksAC(tasks,todolistId))
        })
}

export const deleteTaskTC=(todolistId:string, taskId:string)=>(dispatch:Dispatch)=>{

    return todolistsAPI.deleteTask(todolistId,taskId)
        .then(res=>{
            const action = removeTaskAC(todolistId,taskId)
            dispatch(action)
        })
}
export const addTaskTC=(title:string,todolistId:string)=>(dispatch:Dispatch)=>{

    return todolistsAPI.createTask(title, todolistId)
        .then(res=>{
            const task = res.data.data.item
            const action = addTaskAC(task)
            dispatch(action)
        })
}
export const changeTaskStatusTC=(taskId:string, status:TaskStatuses,todolistId:string)=>
    (dispatch:Dispatch,getState:()=>AppRootState)=>{
    const state = getState();
    const task = state.tasks[todolistId].find(t=>t.id===taskId)
        if(!task){
            console.warn('task not found in the state')
            return;
        }
    const model:UpdateTaskModelType={
        title: task.title,
        description: task.description,
        status: status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
    }
    return todolistsAPI.updateTask(todolistId,taskId,model)
        .then(res=>{
            const action = changeTaskStatusAC(taskId,status,todolistId)
            dispatch(action)
        })
}



type SetTasksActionType=ReturnType<typeof setTasksAC>
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskNameType = ReturnType<typeof changeTaskNameAC>

type AllTasksReducerType = RemoveTaskType | AddTaskType
    | ChangeTaskStatusType | ChangeTaskNameType | AddTodolistType
    | removeTodolistType | SetTodolistType |SetTasksActionType