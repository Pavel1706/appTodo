import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type changeInputType={
    title:string
    onChange:(newTitle:string)=> void
}



export const ChangeInput = React.memo( function (props:changeInputType){
    console.log('input changed')
    let [editMode, setEditMode]=useState(false)
    let [title, setTitle]=useState(props.title)

    function Active(){
        setEditMode(true)
    }
    function View(){
        setEditMode(false)
        props.onChange(title)
    }
    function change(e: ChangeEvent<HTMLInputElement>){
        setTitle(e.currentTarget.value)
    }

    function EnterInput(e:KeyboardEvent<HTMLInputElement>){
        if(e.charCode===13) {
            setEditMode(false)
            props.onChange(title)
        }
    }


    return  editMode
        ?  <TextField value={title} onBlur={View} onChange={change}
                  onKeyPress={EnterInput} autoFocus/>
        : <span onDoubleClick={Active}>{props.title}</span>
})