import React, {useCallback, useEffect} from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {Menu} from '@material-ui/icons';
import {Button, Container, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {TaskType} from '../API/todolists-api';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {CircularProgress} from "@mui/material";
import {logOutTC} from "../features/Login/login-reducer";

export type FilterValuesType = "all" | "active" | "completed";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootState, RequestStatusType>((state) => state.app.status)
    const initialized = useSelector<AppRootState, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)


    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback( () => {
        dispatch(logOutTC())
    },[])

    if (!initialized) {
        return <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }


    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackBar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/"} element={<TodolistsList demo={demo}/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>

        </BrowserRouter>
    );
}

export default App;
