import { IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemType = {
    addItem: (title: string) => void
}

export const AddItem = React.memo((props: AddItemType) => {
    console.log('addItem is called')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addTask();
        }
    }


    return <div>
        <TextField value={title}
                   variant={'outlined'}
                   label={'Type value'}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
        />
        <IconButton onClick={addTask} color={'primary'}>
            <ControlPoint/>
        </IconButton>

    </div>
})
