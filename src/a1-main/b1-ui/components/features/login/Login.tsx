import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import s from './Login.module.css'
import {loginThunk} from "../../../../b2-bll/reducers/LoginReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../b2-bll/store";
import {Navigate} from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const theme = useSelector<AppRootStateType, boolean>(state => state.theme.isDark)
    let dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'password must be longer than 3 characters'
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(loginThunk(values))
            formik.resetForm();
        },
    })
    if (isLogin) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    {!theme ? <span className={s.textBody}>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                    </span> : <span>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                    </span>}

                </FormLabel>

                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        {!theme ? <TextField className={s.inpColor} {...formik.getFieldProps('email')}
                                             label="Email"
                                             margin="normal"/> : <TextField {...formik.getFieldProps('email')}
                                                                            label="Email"
                                                                            margin="normal"/>}

                        {formik.touched.email && formik.errors.email &&
                            <div className={s.error}>{formik.errors.email}</div>}
                        {!theme ? <TextField className={s.inpColor} {...formik.getFieldProps('password')}
                                             type="password"
                                             label="Password"
                                             margin="normal"
                        /> : <TextField {...formik.getFieldProps('password')}
                                        type="password"
                                        label="Password"
                                        margin="normal"
                        />}

                        {formik.touched.password && formik.errors.password &&
                            <div className={s.error}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox  {...formik.getFieldProps('rememberMe')}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>

                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}
