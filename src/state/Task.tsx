import {changeTaskNameAC, changeTaskStatusAC, changeTaskStatusTC, deleteTaskTC, removeTaskAC} from "./tasks-reducer";
import {ChangeInput} from "../ChangeInput";

import {useDispatch} from "react-redux";
import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../API/todolists-api";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();
    const onClickHandler = useCallback(() => dispatch(deleteTaskTC(props.todolistId, props.task.id)), [])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusTC(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId))
    }, [])

    const changename = useCallback((newTitle: string) => {
        dispatch(changeTaskNameAC(props.task.id, newTitle, props.todolistId))
    }, [changeTaskNameAC])

    return <div key={props.task.id} className={props.task.status===TaskStatuses.Completed ? 'is-done' : ""}>
        <Checkbox onChange={onChangeHandler} checked={props.task.status === TaskStatuses.Completed}/>
        <ChangeInput title={props.task.title} onChange={changename}/>

        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>

})