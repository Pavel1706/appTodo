import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import React, {useCallback, useEffect} from 'react';
import {AddItem} from '../../../components/AddItem/AddItem';
import {FilterValuesType} from '../../../app/App';
import {ChangeInput} from '../../../components/EditableSpan/ChangeInput';
import {AppRootState} from "../../../app/store";
import {addTaskTC, getTasksTC} from "../tasks-reducer";
import {useDispatch, useSelector} from 'react-redux';
import {TaskStatuses, TaskType} from "../../../API/todolists-api";
import {Task} from "./Task/Task";
import {TodolistDomainType} from "../todolists-reducer";


type PropsType = {
    todolist: TodolistDomainType
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    removeTodolist: (id: string) => void
    changeNameTodo: (newTitle: string, id: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    console.log('todolist is called')



    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todolist.id])
    const dispatch = useDispatch();

    useEffect(()=> {
        if(demo) {
            return
        }
            dispatch(getTasksTC(props.todolist.id))
    },[])

    const removeTodolist = () => props.removeTodolist(props.todolist.id)

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "all"),[props.changeFilter,props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "active"),[props.changeFilter,props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "completed"),[props.changeFilter,props.todolist.id]);

    const TodoName=useCallback((newTitle: string)=> {
        props.changeNameTodo( props.todolist.id, newTitle)
    },[props.todolist.id,props.changeNameTodo])

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status===TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status===TaskStatuses.Completed);
    }
    const addTask=useCallback((title:string)=>{
            dispatch(addTaskTC(title, props.todolist.id))
    }, [dispatch])

    return <div>
        <h3><ChangeInput title={props.todolist.title} onChange={TodoName}/>
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus==='loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItem addItem={addTask} disabled={props.todolist.entityStatus==='loading'}/>
        <ul>
            {
                tasksForTodolist.map(t => <Task
                    key={t.id}
                    task={t}
                todolistId={props.todolist.id}/>)
            }
        </ul>
        <div>
            <Button variant={props.todolist.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'} variant={props.todolist.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'secondary'} variant={props.todolist.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

