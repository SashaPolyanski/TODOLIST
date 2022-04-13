import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    oldTitle: string
    changeTitleHandler:(title: string)=>void
}


const EditableSpan = React.memo ((props: PropsType) => {
    console.log('editable span')
    let [title, setTitle] = useState(props.oldTitle)
    let [edit, setEdit] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        console.log(title)
    }

    const editHandler = () => {
        props.changeTitleHandler(title)
        setEdit(!edit)
    }
    const editHandlerInput = useCallback ((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter')
            setEdit(!edit)
        props.changeTitleHandler(title)
    },[props.changeTitleHandler])


    return (
        <span onDoubleClick={editHandler} onKeyPress={editHandlerInput} >
            {edit ?
                <TextField id="standard-basic" variant="standard" size={'small'} value={title} autoFocus onChange={onChangeHandler}/>
                :
                <span>{props.oldTitle}</span>}
        </span>
    );
});

export default EditableSpan;