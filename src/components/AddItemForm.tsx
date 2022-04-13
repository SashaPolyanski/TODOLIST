import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";

import DeleteIcon from '@mui/icons-material/Delete';
import {Button, IconButton, TextField} from "@mui/material";

type PropsType = {
    addTask: ( title: string) => void
}

export const AddItemForm =React.memo ((props: PropsType) => {
    console.log('add item form')
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)

    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Обязательное поле для ввода')
            setTimeout(setError, 3000)
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()

        }
    }

    return (
        <div>
            <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            <TextField color={error ? 'error' : 'primary'} id="standard-basic" variant="standard" size={'small'} value={title} onKeyPress={onKeyPressHandler}
                       onChange={onChangeTitleHandler}/>
            <Button variant={'contained'} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} onClick={addTaskHandler}>+</Button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
});

export default AddItemForm;