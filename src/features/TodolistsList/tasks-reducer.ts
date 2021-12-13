import {Dispatch} from "redux";
import {TasksStateType} from "../../app/App";
import {AddTodolistType, removeTodolistType, SetTodolistType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../API/todolists-api";
import {AppRootState} from "../../app/store";
import {setErrorAC, SetAppErrorType, setStatusAC, SetAppStatusType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


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
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.id ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case "SET-TODOLISTS":
            const stateCopy = {...state}
            action.todolist.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
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
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task: task,
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
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {
        type: 'SET-TASKS',
        tasks: tasks,
        todolistId: todolistId
    } as const
}


export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<AllTasksReducerType>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setStatusAC('succeeded'))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<AllTasksReducerType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC(todolistId, taskId)
            dispatch(action)
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<AllTasksReducerType>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.createTask(title, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                // if (res.data.messages.length) {
                //     dispatch(setErrorAC(res.data.messages[0]))
                // } else {
                //     dispatch(setErrorAC('Some error occurred'))
                // }
                // dispatch(setStatusAC('failed'))
            }
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch)
            // dispatch(setErrorAC(error.message))
            // dispatch(setStatusAC('failed'))
        })
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<AllTasksReducerType>, getState: () => AppRootState) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return;
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel,
        }
        return todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if(res.data.resultCode ===0){
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch)
                //     if (res.data.messages.length) {
                //         dispatch(setErrorAC(res.data.messages[0]))
                //     } else {
                //         dispatch(setErrorAC('Some error occurred'))
                //     }
                //     dispatch(setStatusAC('failed'))
                }
            })
            .catch((error)=>{
                handleServerNetworkError(error, dispatch)
                // dispatch(setErrorAC(error.message))
                // dispatch(setStatusAC('failed'))
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


type AllTasksReducerType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistType
    | removeTodolistType
    | SetTodolistType
    | ReturnType<typeof setTasksAC>
    | SetAppErrorType
    | SetAppStatusType