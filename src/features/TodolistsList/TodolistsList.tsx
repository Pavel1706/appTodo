import React, {useCallback, useEffect} from "react";
import {
    changeTodolistFilterAC, changeTodolistTitleTC,
    createTodolistsTC,
    deleteTodolistTC,
    getTodolistsTC,
    TodolistDomainType
} from "./todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {Grid, Paper} from "@material-ui/core";
import {AddItem} from "../../components/AddItem/AddItem";
import {Todolist} from "./Todolist/Todolist";
import {FilterValuesType} from "../../app/App";
import {Navigate} from "react-router-dom";

type TodolistsListType = {
    demo?: boolean
}


export const TodolistsList: React.FC<TodolistsListType> = ({demo = false}) => {
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(getTodolistsTC())
    }, [])

    console.log('app is called')
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)


    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(deleteTodolistTC(id))
    }, [dispatch])

    const addItem = useCallback((Newtitle: string) => {
        dispatch(createTodolistsTC(Newtitle))
    }, [dispatch])

    const changeNameTodo = useCallback((id: string, newTitle: string) => {
        const action = changeTodolistTitleTC(id, newTitle)
        dispatch(action)
    }, [])

    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }


    return (<>
        <Grid container style={{padding: '20px'}}>
            <AddItem addItem={addItem}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    return (
                        <Grid item>
                            <Paper style={{padding: '20px'}}>
                                <Todolist demo={demo}
                                          todolist={tl}
                                          changeNameTodo={changeNameTodo}
                                          key={tl.id}
                                          changeFilter={changeFilter}
                                          removeTodolist={removeTodolist}
                                />
                            </Paper>
                        </Grid>)
                })
            }
        </Grid>
    </>)
}