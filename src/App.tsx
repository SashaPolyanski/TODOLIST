import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import AddItemForm from "./components/addItemForm/AddItemForm";
import {Todolist} from "./Todolist";
import PrimarySearchAppBar from "./components/AppBar";
import {Container, Grid, Paper} from "@mui/material";


export type FilterValueType = 'ALL' | 'COMPLETED' | 'ACTIVE'
export type TlType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    let tlID1 = v1()
    let tlID2 = v1()


    let [tl, setTl] = useState<Array<TlType>>([
        {id: tlID1, title: 'What to learn', filter: 'ALL'},
        {id: tlID2, title: 'What to buy', filter: 'ALL'}
    ])
    let [tasks, setTasks] = useState({
            [tlID1]:
                [
                    {id: v1(), title: "HTML&CSS", isDone: true},
                    {id: v1(), title: "JS", isDone: true},
                    {id: v1(), title: "ReactJS", isDone: false}
                ],
            [tlID2]:
                [
                    {id: v1(), title: "HTML&CSS2", isDone: true},
                    {id: v1(), title: "JS2", isDone: true},
                    {id: v1(), title: "ReactJS2", isDone: false}
                ],

        }
    )
    //Object.key всегда возвращает массив строк
    console.log(Object.keys(tasks))




    const removeTask = (tlID: string, taskID: string) => {
        setTasks({...tasks, [tlID]: tasks[tlID].filter(f => f.id !== taskID)})

    }
    const addTask = (tlID: string, title: string) => {
        setTasks({...tasks, [tlID]: [{id: v1(), title, isDone: false}, ...tasks[tlID]]})
    }
    const changeStatus = (tlID: string, taskID: string, checked: boolean) => {
        setTasks({...tasks, [tlID]: tasks[tlID].map(m => m.id === taskID ? {...m, isDone: checked} : m)})
    }
    const changeTitle = (tlId: string, taskID: string, title: string) => {
        setTasks({...tasks, [tlId]: tasks[tlId].map(m => m.id === taskID ? {...m, title: title} : m)})
        console.log(title)
    }



    const changeFilter = (tlId: string, value: FilterValueType) => {
        setTl(tl.map(m => m.id === tlId ? {...m, filter: value} : m))
    }
    const changeTitleTl = (tlId: string, title: string) => {
        setTl(tl.map(m => m.id === tlId ? {...m, title: title} : m))
    }
    const addTl = (title: string) => {
        let newID = v1();
        setTl([{id: newID, title, filter: 'ALL'}, ...tl])
        setTasks({...tasks, [newID]: []})
    }
    const removeTl = (tlID: string) => {
        setTl(tl.filter(f => f.id !== tlID))
        delete tasks[tlID]
        // проверка на удаление объектов в удаленном массиве
        console.log(tasks[tlID2])
    }



    return (
        <div className="App">
            <PrimarySearchAppBar/>
            <Container maxWidth="xl" fixed>
                <div style={{marginTop:'60px', marginLeft:'30px'}}><h3>ADD NEW TODO</h3></div>
                <Grid container style={{padding:'10px', margin: '10px 0px 40px 0px'}}>

                    <AddItemForm addItem={addTl}  />
                </Grid>
                <Grid container spacing={5}>
                    {tl.map((tl) => {
                        let filteredTask = tasks[tl.id]
                        if (tl.filter === 'ACTIVE') {
                            filteredTask = tasks[tl.id].filter(f => f.isDone)
                        }
                        if (tl.filter === 'COMPLETED') {
                            filteredTask = tasks[tl.id].filter(f => !f.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding:'20px', backgroundColor: '#bfb2b2'}}>
                                <Todolist
                                    key={tl.id}
                                    tlId={tl.id}
                                    title={tl.title}
                                    tasks={filteredTask}
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

export default App;
