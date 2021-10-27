import React, {ChangeEvent, useState, KeyboardEvent} from 'react';


type changeInputType={
    title:string
    onChange:(newTitle:string)=> void

}

export function Change(props:changeInputType){
    let [editMode, setEditMode]=useState(false)
    let[title, setTitle]=useState('')


    function activeEditMode(){
        setEditMode(true)
        setTitle(props.title)
    }
    function changeTitle(e: ChangeEvent<HTMLInputElement>){
        setTitle(e.currentTarget.value)
    }


function activeViewMode (){
        setEditMode(false)
    props.onChange(title)

}
        return editMode
            ? <input value={title} onChange={changeTitle} autoFocus onBlur={activeViewMode}/>
            :<span onDoubleClick={activeEditMode}>{props.title}</span>
}