import React, {useEffect} from 'react';
import '../../App.css';
import PrimarySearchAppBar from "./common/appBar/AppBar";
import {useDispatch, useSelector} from "react-redux";
import {CustomizedSnackbars} from "../../components/features/snackBar/snackbar";
import TodolistList from "./common/todolistList/TodolistList";
import {Login} from "../../components/features/login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {initializeAppThunk} from "../../state/reducers/LoginReducer";
import {AppRootStateType} from "../../state/store";
import {CircularProgress} from "@mui/material";
import s from './AppWithRedux.module.css'


function AppWithRedux() {
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const theme = useSelector<AppRootStateType, boolean>(state => state.theme.isDark)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppThunk())


    }, [])

    if (!isInitialized) {
        debugger
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (

        <div className={theme ? s.body : s.bodyDark}>

            <PrimarySearchAppBar/>
            <CustomizedSnackbars/>
            <Routes>
                <Route path={'/'} element={<TodolistList/>}/>
                <Route path={'login'} element={<Login/>}/>
                <Route path={'404'} element={<div><h1>404 page not found</h1></div>}/>
                <Route path={'*'} element={<Navigate to={''}/>}/>

            </Routes>
        </div>

    );
}

export default AppWithRedux;
