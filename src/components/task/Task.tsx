import React, {ChangeEvent, useCallback} from 'react';
import s from "../../Todolist.module.css";
import {IconButton, Switch} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableSpan from "../EditableSpan/EditableSpan";
import {TaskType} from "../../Todolist";


type PropsType = {
    task: TaskType
    removeTaskHandler: (taskID: string) => void
    changeTitleHandler: (taskID: string, title: string) => void
    changeStatusHandler: (taskID: string, newValueChecked: boolean) => void
}

const Task = React.memo((props: PropsType) => {

    console.log('task')

    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatusHandler(props.task.id, e.currentTarget.checked)
    }, [props.changeStatusHandler, props.task.id])


    const changeTitleHandler = useCallback((title: string) => {
        props.changeTitleHandler(props.task.id, title)
    }, [props.changeTitleHandler, props.task.id])


    const removeTaskHandler = useCallback(() => props.removeTaskHandler(props.task.id), [props.removeTaskHandler, props.task.id])


    return (
        <div>
            <li key={props.task.id} className={props.task.isDone ? s.isDone : ''}>
                <IconButton aria-label="delete" size="small">
                    <DeleteIcon onClick={removeTaskHandler} fontSize="inherit"/>
                </IconButton>
                <Switch color={'success'} checked={props.task.isDone} onChange={changeStatusHandler}/>
                <EditableSpan oldTitle={props.task.title}
                              changeTitleHandler={changeTitleHandler}/>
            </li>
        </div>
    )
});

export default Task;