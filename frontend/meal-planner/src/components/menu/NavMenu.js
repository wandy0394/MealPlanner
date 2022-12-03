import { Box, Divider, ListItem, Typography } from "@mui/material"
import MenuLink from "./MenuLink"
import MenuContents from "./MenuContents"
import { styled } from "@mui/system"

function Splash() {
    return (
        <ListItem sx={{height:'15vh', display:'flex', justifyContent:'center'}}>
            <MenuLink to='/' style={{textDecoration:'none'}}>
                <Typography variant='h4'>Meal Manager</Typography>
            </MenuLink>
        </ListItem>   
    )
}


export default function NavMenu() {
    return (
        <Box 
            sx={{
                width: '12vw', 
                minWidth:240, 
                display:{xs:'none', md:'flex'}, 
                height:{xs:'auto', md:'100%'}, 
                flexDirection:'column', 
                gap:'1vh',
                borderRight: '2px solid #9e9e9e',
                padding:'1rem'
            }}
        >
            <Splash/>
            
            <MenuContents/>
        </Box>

    )
}