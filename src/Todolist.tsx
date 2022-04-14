import React, {useCallback} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button} from "@mui/material";
import Task from "./components/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tlID: string, taskID: string) => void
    changeFilter: (tlId: string, value: FilterValueType) => void
    addTask: (tlID: string, title: string) => void
    changeStatus: (tlID: string, taskID: string, checked: boolean) => void
    removeTl: (tlID: string) => void
    changeTitle: (tlID: string, taskID: string, title: string) => void
    changeTitleTl: (tlId: string, title: string) => void
    filter: FilterValueType
    tlId: string
}


export const Todolist = React.memo((props: PropsType) => {
    console.log('todoList')

    const changeFilterHandler = useCallback((value: FilterValueType) => props.changeFilter(props.tlId, value), [props.changeFilter, props.tlId])


    const removeTaskHandler = useCallback((taskID: string) => props.removeTask(props.tlId, taskID), [props.removeTask, props.tlId])

    const callBackHandler = useCallback((title: string) => {
        props.addTask(props.tlId, title)
        //    массив зависимостей
    }, [props.addTask, props.tlId])


    const changeTitleHandler = useCallback((taskID: string, title: string) => {
        props.changeTitle(props.tlId, taskID, title)
    }, [props.changeTitle,props.tlId])


    const changeStatusHandler = useCallback((taskID: string, newIsDoneValue: boolean) => {
        props.changeStatus(props.tlId, taskID, newIsDoneValue)
    }, [props.changeStatus, props.tlId])


    const changeTitleTlHandler = useCallback((title: string) => {
        props.changeTitleTl(props.tlId, title)
    }, [props.changeTitleTl, props.tlId])


    let filteredTask = props.tasks
    if (props.filter === 'ACTIVE') {
        filteredTask = filteredTask.filter(f => !f.isDone)
    }
    if (props.filter === 'COMPLETED') {
        filteredTask = filteredTask.filter(f => f.isDone)
    }

    return <div>
        <h3><EditableSpan oldTitle={props.title} changeTitleHandler={changeTitleTlHandler}/></h3>

        <div>
            <AddItemForm addItem={callBackHandler}/>
        </div>
        <ul>
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
