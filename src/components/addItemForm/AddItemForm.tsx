import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../../Todolist.module.css";

import DeleteIcon from '@mui/icons-material/Delete';
import {Button, IconButton, TextField} from "@mui/material";
import {RequestStatusType} from "../../state/reducers/appReducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";

type PropsType = {
    addItem: (title: string) => void
    entity?: RequestStatusType

}

export const AddItemForm = React.memo((props: PropsType) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)
    const theme = useSelector<AppRootStateType, boolean>(state => state.theme.isDark)
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)

    }
    console.log(props.entity)
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
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
                {!theme ? <DeleteIcon color={'secondary'} fontSize="inherit"/> : <DeleteIcon fontSize="inherit"/>}
            </IconButton>
            {!theme ? <TextField focused color={error ? 'error' : 'secondary'} id="standard-basic" variant="standard"
                                 size={'small'} value={title} onKeyPress={onKeyPressHandler}
                                 onChange={onChangeTitleHandler}/> :
                <TextField color={error ? 'error' : 'secondary'} id="standard-basic" variant="standard" size={'small'}
                           value={title} onKeyPress={onKeyPressHandler}
                           onChange={onChangeTitleHandler}/>}
            {!theme ? <Button color={'secondary'} disabled={props.entity === 'loading'} variant={'contained'}
                              style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                              onClick={addTaskHandler}>+</Button> :
                <Button disabled={props.entity === 'loading'} variant={'contained'}
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                        onClick={addTaskHandler}>+</Button>}

            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
});

export default AddItemForm;