import { Box, TextField, Typography } from "@mui/material"

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
            <Typography sx={{textAlign:'center', color:(macroValue >= macroTarget)?'red':'black'}} variant='h3'>{macroValue}</Typography>
        </Box>

    )
}

export default MacroCounter