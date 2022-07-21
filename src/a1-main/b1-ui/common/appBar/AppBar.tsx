import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../b2-bll/store";
import {logoutThunk} from "../../../b2-bll/reducers/LoginReducer";
import s from './AppBar.module.css'
import Theme from "../../components/features/theme/Theme";


export default function SwipeableTemporaryDrawer() {

    const emailInfo = useSelector<AppRootStateType, string>(state =>state.auth.email )
    const isLogin = useSelector<AppRootStateType, boolean>(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch()


    const [state, setState] = React.useState(false);
    const closeDrawer = () =>setState(false)
    const openDrawer = () =>setState(true)
    const logoutHandler = () =>{
        dispatch(logoutThunk())
    }

    const list = () => (
        <Box
            className={s.box}
            sx={{width:  250, backgroundColor: 'red' }}
            role="presentation"
            onClick={closeDrawer}
            onKeyDown={openDrawer}
        >
            {/*<List>*/}

            {/*    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
            {/*        <ListItem key={text} disablePadding>*/}
            {/*            <ListItemButton>*/}
            {/*                <ListItemIcon>*/}
            {/*                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
            {/*                </ListItemIcon>*/}
            {/*                <ListItemText primary={text}/>*/}
            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*    ))}*/}
            {/*</List>*/}
            {/*можно добавить пункты меню*/}
            <Divider/>

        </Box>
    );

    return (
        <div >
            <div className={s.navigateContainer}>
                <Button variant={'contained'} onClick={openDrawer}>menu</Button>
                <span className={s.theme}><Theme/></span>
            </div>

            <SwipeableDrawer
                anchor={'left'}
                open={state}
                onClose={closeDrawer}
                onOpen={openDrawer}
                sx={{ '& .MuiPaper-root': { backgroundColor: 'antiquewhite' } }}
            >
                {/*<Box sx={{ backgroundColor: 'red' }}>*/}
                {list()}
                {isLogin && <div className={s.emailAndInfo}> {emailInfo}</div>}
                {isLogin && <Button size={'small'} onClick={logoutHandler}>logout</Button>}
                {!isLogin && <div className={s.emailAndInfo}>
                    <div>Please login to continue</div>
                        </div>}

                {/*</Box>*/}


            </SwipeableDrawer>

        </div>
    );
}
