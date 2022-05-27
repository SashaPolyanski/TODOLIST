import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {MaterialUISwitch} from './ThemeStyled';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {switchTheme} from "../../../state/reducers/themeReducer";


export default function Theme() {
    const isDark = useSelector<AppRootStateType, boolean>(state => state.theme.isDark)
    const dispatch = useDispatch()


    console.log(isDark)
    return (
        <FormGroup>
            <FormControlLabel
                onClick={()=>{dispatch(switchTheme(!isDark))}}
                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                label="Switch theme"
            />
        </FormGroup>
    );
}
