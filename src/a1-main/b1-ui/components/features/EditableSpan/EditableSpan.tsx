import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    oldTitle: string
    changeTitleHandler:(title: string)=>void
}


const EditableSpan = React.memo ((props: PropsType) => {
    // console.log('editable span')
    let [title, setTitle] = useState(props.oldTitle)
    let [edit, setEdit] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const editHandler = () => {
        props.changeTitleHandler(props.oldTitle)
        setEdit(!edit)
    }
    const editHandlerFalse = () => {
        props.changeTitleHandler(title)
        setEdit(false)
    }
    const editHandlerInput = useCallback ((e: KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Enter') {
            setEdit(false)
            props.changeTitleHandler(title)
        }
    },[props.changeTitleHandler])

    return (
        <span onDoubleClick={editHandler} onBlur={editHandlerFalse} onKeyPress={editHandlerInput} >
            {edit ?
                <TextField id="standard-basic" variant="standard" size={'small'} value={title} autoFocus onChange={onChangeHandler}/>
                :
                <span>{props.oldTitle}</span>}
        </span>
    );
});

export default EditableSpan;