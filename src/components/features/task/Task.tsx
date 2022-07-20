import React, {ChangeEvent, useCallback} from 'react';
import s from "../../../Todolist.module.css";
import {IconButton, Switch} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableSpan from "../EditableSpan/EditableSpan";
import {TaskStatuses} from "../../../a1-main/b3-dal/todolistApi";
import {TasksType} from "../../../state/reducers/tasksReducer";
import {RequestStatusType} from "../../../state/reducers/appReducer";


type PropsType = {
    task: TasksType
    removeTaskHandler: (taskID: string) => void
    changeTitleHandler: (taskID: string, title: string) => void
    changeStatusHandler: (taskID: string, status: number) => void
    entity?: RequestStatusType
}

const Task = React.memo((props: PropsType) => {


    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatusHandler(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props.changeStatusHandler, props.task.id])


    const changeTitleHandler = useCallback((title: string) => {
        console.log({title})
        props.changeTitleHandler(props.task.id, title)
    }, [props])


    const removeTaskHandler = useCallback(() => props.removeTaskHandler(props.task.id), [props.removeTaskHandler, props.task.id])


    return (
        <div>
            <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? s.isDone : ''}>
                <IconButton aria-label="delete" size="small">
                    <DeleteIcon onClick={removeTaskHandler} fontSize="inherit"/>
                </IconButton>
                <Switch color={'success'} checked={props.task.status === TaskStatuses.Completed} disabled={props.entity==='loading'}
                        onChange={changeStatusHandler}/>
                <EditableSpan oldTitle={props.task.title}
                              changeTitleHandler={changeTitleHandler}/>
            </li>
        </div>
    )
});

export default Task;