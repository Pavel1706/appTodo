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

type TodolistsListType ={

}




export const TodolistsList: React.FC<TodolistsListType>=(props)=> {

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
        dispatch(deleteTodolistTC(id))
        // const action = removeTodolistAC(id)
        // dispatch(action)

    },[dispatch])

    const addItem = useCallback((Newtitle: string) => {
        dispatch(createTodolistsTC(Newtitle))
    }, [dispatch])

    const  changeNameTodo=useCallback(( id: string, newTitle: string)=> {
        const action = changeTodolistTitleTC(id, newTitle)
        dispatch(action)
    },[])


    return (<>
        <Grid container style={{padding: '20px'}}>
            <AddItem addItem={addItem}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    return(
                        <Grid item>
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
                        </Grid>)
                })
            }
        </Grid>
    </>)
}