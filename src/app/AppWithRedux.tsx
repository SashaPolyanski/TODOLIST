import React, {useCallback, useEffect} from 'react';
import '../App.css';
import AddItemForm from "../components/addItemForm/AddItemForm";
import {TasksStateType, Todolist} from "../Todolist";
import PrimarySearchAppBar from "../components/AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddTlAc,
    ChangeFilterAc,
    ChangeTodoTitleThunkCreator,
    CreateTodoThunkCreator,
    FetchTodosThunkCreator,
    FilterValueType,
    RemoveTLAc,
    RemoveTodoThunkCreator,
    ReNameAc,
    TodolistDomainType
} from "../state/todoListReducer";
import {AddTaskThunkCreator, removeTaskAC, RemoveTaskThunkCreator, UpdateTaskTC} from "../state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskStatuses} from "../api/todolistApi";
import {CustomizedSnackbars} from "../components/snackBar/snackbar";


function AppWithRedux() {
    useEffect(() => {
        dispatch(FetchTodosThunkCreator())
    },[])

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const tl = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.TL)

    const dispatch = useDispatch()


    //Object.key всегда возвращает массив строк
    // console.log(Object.keys(tasks))


    const removeTask = useCallback((tlID: string, taskID: string) => {
        //Фиксируем изменненное значение, делаем копию наших таскс, находим наш ключь и перезатираем его новым объектом тастс с этим ключем, вызываем фильтр и фильтруем таски
        // setTasks({...tasks, [tlID]: tasks[tlID].filter(f => f.id !== taskID)})
        //Создаем action и диспачим его в наш редюсер
        dispatch(RemoveTaskThunkCreator(taskID, tlID))

    }, [dispatch, removeTaskAC])
    const addTask = useCallback((tlID: string, title: string) => {
        dispatch(AddTaskThunkCreator(tlID, title))
        // setTasks({...tasks, [tlID]: [{id: v1(), title, isDone: false}, ...tasks[tlID]]})
    }, [])
    const changeStatus = useCallback((tlID: string, taskID: string, status: TaskStatuses) => {
        dispatch(UpdateTaskTC(tlID, taskID, {status}))
        // setTasks({...tasks, [tlID]: tasks[tlID].map(m => m.id === taskID ? {...m, isDone: checked} : m)})
    }, [dispatch])
    const changeTitle = useCallback((tlId: string, taskID: string, title: string) => {
        console.log({tlId, taskID, title})
        dispatch(UpdateTaskTC(tlId, taskID, {title}))
        // setTasks({...tasks, [tlId]: tasks[tlId].map(m => m.id === taskID ? {...m, title: title} : m)})

    }, [dispatch])




    const changeFilter = useCallback((tlId: string, value: FilterValueType) => {
        dispatch(ChangeFilterAc(tlId, value))
        // setTl(tl.map(m => m.id === tlId ? {...m, filter: value} : m))
    }, [dispatch, ChangeFilterAc])
    const changeTitleTl = useCallback((tlId: string, title: string) => {
        dispatch(ChangeTodoTitleThunkCreator(tlId, title))
        // setTl(tl.map(m => m.id === tlId ? {...m, title: title} : m))
    }, [dispatch, ReNameAc])
    const addTl = useCallback((title: string) => {
        dispatch(CreateTodoThunkCreator(title))
    }, [dispatch, AddTlAc])
    const removeTl = useCallback((tlID: string) => {
        dispatch(RemoveTodoThunkCreator(tlID))

        // setTl(tl.filter(f => f.id !== tlID))
        // delete tasks[tlID]
        // проверка на удаление объектов в удаленном массиве
        // console.log(tasks[tlID2])
    }, [dispatch, RemoveTLAc])


    return (
        <div className="App">

            <PrimarySearchAppBar/>
            <CustomizedSnackbars/>

            <Container maxWidth="xl" fixed>
                <div style={{marginTop: '60px', marginLeft: '30px'}}><h3>ADD NEW TODO</h3></div>
                <Grid container style={{padding: '10px', margin: '10px 0px 40px 0px'}}>

                    <AddItemForm addItem={addTl}/>
                </Grid>
                <Grid container spacing={5}>
                    {tl.map((tl) => {

                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '20px', backgroundColor: '#bfb2b2'}}>
                                    <Todolist
                                        todolist={tl}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        removeTl={removeTl}
                                        changeTitle={changeTitle}
                                        changeTitleTl={changeTitleTl}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
