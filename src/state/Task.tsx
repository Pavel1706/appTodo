import {changeTaskNameAC, changeTaskStatusAC, removeTaskAC} from "./tasks-reducer";
import {ChangeInput} from "../ChangeInput";
import {TaskType} from "../Todolist";
import { useDispatch } from "react-redux";
import React, {ChangeEvent} from 'react';
import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useCallback } from "react";

type TaskPropsType={
    todolistId: string
    task: TaskType
}

export const Task = React.memo( (props:TaskPropsType)=> {
    const dispatch = useDispatch();
    const onClickHandler =useCallback( () => dispatch(removeTaskAC(props.task.id, props.todolistId)),[])
    const onChangeHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId))
    },[])

    const changename= useCallback((newTitle: string)=> {
        dispatch(changeTaskNameAC(props.task.id, newTitle, props.todolistId))
    },[changeTaskNameAC])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox onChange={onChangeHandler} checked={props.task.isDone}/>
        <ChangeInput title={props.task.title} onChange={changename}/>

        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>

})