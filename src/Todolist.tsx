import React, {useCallback, useEffect} from 'react';
import AddItemForm from "./components/addItemForm/AddItemForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import {Button} from "@mui/material";
import Task from "./components/task/Task";
import {fetchTasksThunkCreator, RemoveTaskThunkCreator, TasksType} from "./state/tasksReducer";
import {TaskStatuses} from "./api/todolistApi";
import {FilterValueType} from "./state/todoListReducer";
import {useDispatch} from "react-redux";

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (tlID: string, taskID: string) => void
    changeFilter: (tlId: string, value: FilterValueType) => void
    addTask: (tlID: string, title: string) => void
    changeStatus: (tlID: string, taskID: string, status: number) => void
    removeTl: (tlID: string) => void
    changeTitle: (tlID: string, taskID: string, title: string) => void
    changeTitleTl: (tlId: string, title: string) => void
    filter: FilterValueType
    tlId: string
}


export const Todolist = React.memo((props: PropsType) => {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksThunkCreator(props.tlId))
    }, [])

    const changeFilterHandler = useCallback((value: FilterValueType) => props.changeFilter(props.tlId, value), [props.changeFilter, props.tlId])

    const removeTaskHandler = useCallback((taskID: string) => dispatch(RemoveTaskThunkCreator(taskID, props.tlId)),[])

    const callBackHandler = useCallback((title: string) => {
        props.addTask(props.tlId, title)
        //    массив зависимостей
    }, [props.addTask, props.tlId])


    const changeTitleHandler = useCallback((taskID: string, title: string) => {
        props.changeTitle(props.tlId, taskID, title)
    }, [props.changeTitle, props.tlId])


    const changeStatusHandler = useCallback((taskID: string, status: number) => {
        props.changeStatus(props.tlId, taskID, status)
    }, [props.changeStatus, props.tlId])


    const changeTitleTlHandler = useCallback((title: string) => {
        props.changeTitleTl(props.tlId, title)
    }, [props.changeTitleTl, props.tlId])


    let filteredTask = props.tasks
    if (props.filter === 'ACTIVE') {
        filteredTask = filteredTask.filter(f => f.status === TaskStatuses.InProgress)
    }
    if (props.filter === 'COMPLETED') {
        filteredTask = filteredTask.filter(f => f.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan oldTitle={props.title} changeTitleHandler={changeTitleTlHandler}/></h3>

        <div>
            <AddItemForm addItem={callBackHandler}/>
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
                    />
                )
            })}

        </ul>

        <div>
            <Button variant={props.filter === 'ALL' ? 'contained' : 'outlined'} color={'secondary'} onClick={() => {
                changeFilterHandler('ALL')
            }}>ALL
            </Button>
            <Button variant={props.filter === 'ACTIVE' ? 'contained' : 'outlined'} onClick={() => {
                changeFilterHandler('ACTIVE')
            }}>ACTIVE
            </Button>
            <Button variant={props.filter === 'COMPLETED' ? 'contained' : 'outlined'} color={'success'} onClick={() => {
                changeFilterHandler('COMPLETED')
            }}>COMPLETED
            </Button>

        </div>
    </div>
})
