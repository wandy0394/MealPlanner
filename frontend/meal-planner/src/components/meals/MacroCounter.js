import { Box, TextField, Typography } from "@mui/material"
import { strawTheme } from "../utility/StrawTheme"

function MacroCounter(props) {
    const {labelText,  macroValue, macroTarget, dispatch, handleChange, ...other} = props
    return (
        <Box>
            <TextField 
                variant='standard' 
                label={'Target ' + labelText} 
                value={macroTarget} 
                onChange={handleChange} 
                inputProps={{style:{textAlign:'center'}}}
            />
            <Typography 
                sx={{
                    textAlign:'center', 
                    color:(macroValue >= macroTarget)?strawTheme.palette.common.black:strawTheme.palette.error.main
                }} 
                variant='h3'
            >
                {parseFloat(macroValue).toFixed(2)}
            </Typography>
        </Box>

    )
}

export default MacroCounter