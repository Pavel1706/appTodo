import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import React, {useCallback, useEffect} from 'react';
import {AddItem} from './AddItem';
import {FilterValuesType} from './AppWithRedux';
import {ChangeInput} from './ChangeInput';
import {AppRootState} from "./state/store";
import { addTaskTC, getTasksTC} from "./state/tasks-reducer";

import {useDispatch, useSelector} from 'react-redux';

import {TaskStatuses, TaskType} from "./API/todolists-api";

import {Task} from "./state/Task";


type PropsType = {
    id: string
    title: string
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeNameTodo: (newTitle: string, id: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('todolist is called')

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getTasksTC(props.id))

    },[])

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, "all"),[props.changeFilter,props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, "active"),[props.changeFilter,props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, "completed"),[props.changeFilter,props.id]);

    const TodoName=useCallback((newTitle: string)=> {
        props.changeNameTodo( props.id, newTitle)
    },[props.id,props.changeNameTodo])

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status===TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status===TaskStatuses.Completed);
    }
    const addTask=useCallback((title:string)=>{
            dispatch(addTaskTC(title, props.id))
    }, [dispatch])

    return <div>
        <h3><ChangeInput title={props.title} onChange={TodoName}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItem addItem={addTask}/>
        <ul>

            {
                tasksForTodolist.map(t => <Task
                    key={t.id}
                    task={t}
                todolistId={props.id}/>)
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'} variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'secondary'} variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

