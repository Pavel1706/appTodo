import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {AddItem} from "../components/AddItem/AddItem";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {Menu} from '@material-ui/icons';
import {Button, Container, Grid, Paper, Toolbar, Typography} from '@material-ui/core';
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistsTC,
    deleteTodolistTC,
    getTodolistsTC,
    TodolistDomainType,
} from "../features/TodolistsList/todolists-reducer";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from "./store";
import {TaskType} from '../API/todolists-api';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";

export type FilterValuesType = "all" | "active" | "completed";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {


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
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default App;
