import * as React from 'react';
import {SyntheticEvent} from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {setErrorAC} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackBar() {

    const error = useSelector<AppRootState, string | null>(state => state.app.error)
const dispatch = useDispatch()

    const handleClose = (event: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))
    };


    const isOpen = error !== null;

    return (
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} style={{backgroundColor:'red'}} severity="error" sx={{width: '100%'}}>{error}</Alert>
            </Snackbar>
    );
}