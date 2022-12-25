import { Box, CircularProgress, Typography } from "@mui/material"

export default function MacroWeeklyCard(props) {
    const {value, target, name, unit} = props
    let percentage = 0
    if (target === 0) {
        percentage = 0
    }
    else if (value > target) {
        percentage = 100
    }
    else {
        percentage = value/target*100
    }
    return (
        <Box sx={{height:'auto', width:'75%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <Box sx={{position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center', flexDirection:'column', width:'100%', aspectRatio:'1/1'}}>
                <CircularProgress 
                    variant='determinate' 
                    value={(percentage>100)?100:percentage} 
                    size='75%'
                    sx={{zIndex:'1'}}
                />
                    
                <Box sx={{
                        position:'absolute', 
                        display:'flex', 
                        flexDirection:'column',
                        alignItems:'center', 
                        justifyContent:'center', 
                        top:0, 
                        left:0, 
                        bottom:0,
                        right:0,
                        margin:0,
                        padding:0,
                        zIndex:'2',
                    }}
                >
                        <Typography variant='h4'>{value}</Typography>
                        <Typography variant='body2'>/{target} {unit}</Typography>
                </Box>
            </Box>
            <Typography variant='h4'>{name}</Typography>
        </Box>
    )
}