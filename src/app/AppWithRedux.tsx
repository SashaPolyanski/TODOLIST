import React, {useCallback, useEffect} from 'react';
import '../App.css';
import AddItemForm from "../components/addItemForm/AddItemForm";
import {TasksStateType, Todolist} from "../Todolist";
import PrimarySearchAppBar from "../components/AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddTlAc,
    ChangeFilterAc,
    fetchTodosThunk,
    FilterValueType,
    RemoveTLAc,
    ReNameAc,
    TodolistDomainType
} from "../state/todoListReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskStatuses} from "../api/todolistApi";






function AppWithRedux() {
    useEffect(() => {
        dispatch(fetchTodosThunk)
    },[])

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const tl = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.TL)
    const dispatch = useDispatch()


    //Object.key всегда возвращает массив строк
    // console.log(Object.keys(tasks))


    const removeTask = useCallback((tlID: string, taskID: string) => {
        //Фиксируем изменненное значение, делаем копию наших таскс, находим наш ключь и перезатираем его новым объектом тастс с этим ключем, вызываем фильтр и фильтруем таски
        // setTasks({...tasks, [tlID]: tasks[tlID].filter(f => f.id !== taskID)})
        //Создаем action и диспачим его в наш редюсек
        let action = removeTaskAC(taskID, tlID)
        dispatch(action)

    }, [dispatch, removeTaskAC])
    const addTask = useCallback((tlID: string, title: string) => {
        dispatch(addTaskAC(title, tlID))
        // setTasks({...tasks, [tlID]: [{id: v1(), title, isDone: false}, ...tasks[tlID]]})
    }, [dispatch, addTaskAC])
    const changeStatus = useCallback((tlID: string, taskID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(tlID, taskID, status))
        // setTasks({...tasks, [tlID]: tasks[tlID].map(m => m.id === taskID ? {...m, isDone: checked} : m)})
    }, [dispatch, changeTaskStatusAC])
    const changeTitle = useCallback((tlId: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(tlId, taskID, title))
        // setTasks({...tasks, [tlId]: tasks[tlId].map(m => m.id === taskID ? {...m, title: title} : m)})

    }, [dispatch, changeTaskTitleAC])


    const changeFilter = useCallback((tlId: string, value: FilterValueType) => {
        dispatch(ChangeFilterAc(tlId, value))
        // setTl(tl.map(m => m.id === tlId ? {...m, filter: value} : m))
    }, [dispatch, ChangeFilterAc])
    const changeTitleTl = useCallback((tlId: string, title: string) => {
        dispatch(ReNameAc(tlId, title))
        // setTl(tl.map(m => m.id === tlId ? {...m, title: title} : m))
    }, [dispatch, ReNameAc])
    const addTl = useCallback((title: string) => {
        let action = AddTlAc(title)
        dispatch(action)
        // let newID = v1();
        // setTl([{id: newID, title, filter: 'ALL'}, ...tl])
        // setTasks({...tasks, [newID]: []})
    }, [dispatch, AddTlAc])
    const removeTl = useCallback((tlID: string) => {
        dispatch(RemoveTLAc(tlID))

        // setTl(tl.filter(f => f.id !== tlID))
        // delete tasks[tlID]
        // проверка на удаление объектов в удаленном массиве
        // console.log(tasks[tlID2])
    }, [dispatch, RemoveTLAc])


    return (
        <div className="App">
            <PrimarySearchAppBar/>
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
                                        tlId={tl.id}
                                        title={tl.title}

                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
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
