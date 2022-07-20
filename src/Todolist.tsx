import React, {useCallback, useEffect} from 'react';
import AddItemForm from "./components/addItemForm/AddItemForm";
import EditableSpan from "./components/features/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import Task from "./components/features/task/Task";
import {FetchTasksThunk, TasksType} from "./state/reducers/tasksReducer";
import {TaskStatuses} from "./a1-main/b3-dal/todolistApi";
import {FilterValueType, TodolistDomainType} from "./state/reducers/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {AppRootStateType} from "./state/store";
import s from './Todolist.module.css'

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TasksType>
    removeTask: (tlID: string, taskID: string) => void
    changeFilter: (tlId: string, value: FilterValueType) => void
    addTask: (tlID: string, title: string) => void
    changeStatus: (tlID: string, taskID: string, status: TaskStatuses) => void
    removeTl: (tlID: string) => void
    changeTitle: (tlID: string, taskID: string, title: string) => void
    changeTitleTl: (tlId: string, title: string) => void
}


export const Todolist = React.memo((props: PropsType) => {
    const theme = useSelector<AppRootStateType, boolean>(state => state.theme.isDark)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(FetchTasksThunk(props.todolist.id))
    }, [])

    const changeFilterHandler = useCallback((value: FilterValueType) => props.changeFilter(props.todolist.id, value), [props.changeFilter, props.todolist.id])

    const removeTaskHandler = useCallback((taskID: string) => props.removeTask(props.todolist.id, taskID),[props.removeTask, props.todolist.id])

    const callBackHandler = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
        //    массив зависимостей
    }, [props.addTask, props.todolist.id])


    const changeTitleHandler = useCallback((taskID: string, title: string) => {
        console.log({taskID, title})
        props.changeTitle(props.todolist.id, taskID, title)
    }, [props])


    const changeStatusHandler = useCallback((taskID: string, status: number) => {
        props.changeStatus(props.todolist.id, taskID, status)
    }, [props.changeStatus, props.todolist.id])


    const changeTitleTlHandler = useCallback((title: string) => {
        props.changeTitleTl(props.todolist.id, title)
    }, [props.changeTitleTl, props.todolist.id])
    const removeTodoHandler =  useCallback(()=>{
        props.removeTl(props.todolist.id)
    },[ props.removeTl,props.todolist.id])

    let filteredTask = props.tasks
    if (props.todolist.filter === 'ACTIVE') {
        filteredTask = filteredTask.filter(f => f.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'COMPLETED') {
        filteredTask = filteredTask.filter(f => f.status === TaskStatuses.Completed)
    }

    return <div>
        <IconButton aria-label="delete" size="small"  disabled={props.todolist.entityStatus === 'loading'} >

            <DeleteIcon onClick={removeTodoHandler} fontSize="inherit"/>
            {!theme ? <span className={s.removeColor} onClick={removeTodoHandler}>RemoveTODO</span> : <span  onClick={removeTodoHandler}>RemoveTODO</span>}


        </IconButton>
        <h3><EditableSpan oldTitle={props.todolist.title} changeTitleHandler={changeTitleTlHandler}/></h3>

        <div>
            <AddItemForm addItem={callBackHandler} entity={props.todolist.entityStatus}/>
        </div>
        <ul>
            {/*если, при загруке страницы все содержимое пропадает, то это приходит значение undefined*/}
            {filteredTask.map((m) => {
                // const removeTaskHandler =  () => props.removeTask(m.id)
                // в мапе useCallback не используется

                return (
                    <Task
                        key={m.id}
                        task={m}
                        removeTaskHandler={removeTaskHandler}
                        changeTitleHandler={changeTitleHandler}
                        changeStatusHandler={changeStatusHandler}
                        entity={props.todolist.entityStatus}
                    />
                )
            })}

        </ul>

        <div>
            <Button variant={props.todolist.filter === 'ALL' ? 'contained' : 'outlined'} color={'secondary'} onClick={() => {
                changeFilterHandler('ALL')
            }}>ALL
            </Button>
            <Button variant={props.todolist.filter === 'ACTIVE' ? 'contained' : 'outlined'} onClick={() => {
                changeFilterHandler('ACTIVE')
            }}>ACTIVE
            </Button>
            <Button variant={props.todolist.filter === 'COMPLETED' ? 'contained' : 'outlined'} color={'success'} onClick={() => {
                changeFilterHandler('COMPLETED')
            }}>COMPLETED
            </Button>

        </div>
    </div>
})
