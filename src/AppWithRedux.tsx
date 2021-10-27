import React, { useEffect } from 'react';
import './App.css';
import { Todolist} from './Todolist';

import {AddItem} from "./AddItem";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {Menu} from '@material-ui/icons';
import {Button, Container, Grid, Paper, Toolbar, Typography} from '@material-ui/core';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, createTodolistsTC, deleteTodolistsTC, getTodolistsTC,
    removeTodolistAC, TodolistDomainType,

} from "./state/todolists-reducer";

import {addTaskAC, changeTaskNameAC, changeTaskStatusAC, removeTaskAC,} from "./state/tasks-reducer";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from "./state/store";
import {useCallback} from 'react';
import {TaskType} from './API/todolists-api';

export type FilterValuesType = "all" | "active" | "completed";
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    useEffect(()=> {
        dispatch(getTodolistsTC())
    },[])

    console.log('app is called')
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)





    const changeFilter=useCallback((todolistId: string, value: FilterValuesType)=> {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    },[dispatch])

    const removeTodolist=useCallback((id: string)=> {
        dispatch(deleteTodolistsTC(id))
        // const action = removeTodolistAC(id)
        // dispatch(action)

    },[dispatch])

    const addItem = useCallback((Newtitle: string) => {
        dispatch(createTodolistsTC(Newtitle))
        // const action = addTodolistAC(Newtitle)
        // dispatch(action)
    }, [dispatch])

    const  changeNameTodo=useCallback((newTitle: string, id: string)=> {
        const action = changeTodolistTitleAC(newTitle, id)
        dispatch(action)
    },[])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItem addItem={addItem}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {


                            return <Grid item>
                                <Paper style={{padding: '20px'}}>
                                    <Todolist
                                        changeNameTodo={changeNameTodo}
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
