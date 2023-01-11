import { Alert, Snackbar } from "@mui/material";
import { useEffect, useReducer, useState } from "react";

export const SEVERITY = {
    ERROR:'error',
    WARNING:'warning',
    INFO:'info',
    SUCCESS:'success'
}

export const SNACKBAR_ACTIONS = {
    SUCCESS:'SUCESS',
    WARNING:'WARNING',
    INFO:'INFO',
    ERROR:'ERROR'
}


const INITIAL_STATUS = {
    message:'Status Message',
    severity:SEVERITY.INFO,
    isMessageVisible:false
}
export function useStateSnackbar(init=INITIAL_STATUS) {
    const [state, dispatch] = useReducer(statusSnackbarReducer, init)
    
    function statusSnackbarReducer(state, action) {
        const {type, payload} = action
        switch (type) {
            case SNACKBAR_ACTIONS.SUCCESS:
                return {
                    message:payload.message,
                    severity:payload.severity,

                }
            case SNACKBAR_ACTIONS.WARNING:
            case SNACKBAR_ACTIONS.INFO:
            case SNACKBAR_ACTIONS.ERROR:
            default:
                return state
        }
    }

    return [state, dispatch]
}

export default function StatusSnackbar({statusMessageState, setStatusMessageState}) {

    function handleClose() {
        setStatusMessageState({...statusMessageState, isMessageVisible:false})
    }

    useEffect(()=>{
        console.log(statusMessageState)
    }, [statusMessageState])

    return (
        <Snackbar
            open={statusMessageState.isMessageVisible}
            onClose={handleClose}
            autoHideDuration={5000}
        >
            <Alert 
                severity={statusMessageState.severity} 
                onClose={handleClose}
                sx={{width:'100%'}}
            >
                {statusMessageState.message}
            </Alert>
        </Snackbar>
    )
}