import { Box, ListItem, Typography } from "@mui/material"
import MenuLink from "./MenuLink"
import MenuContents from "./MenuContents"

export default function NavMenu() {
    return (
        <Box sx={{width: '12vw', minWidth:180, display:{xs:'none', md:'flex'}, height:{xs:'auto', md:'100%'}, flexDirection:'column', gap:'0.5vh'}}>
            <ListItem sx={{height:'15vh', display:'flex', justifyContent:'center'}}>
                <MenuLink to='/' style={{textDecoration:'none'}}>
                    <Typography variant='h4'>Meal Manager</Typography>
                </MenuLink>
            </ListItem>            
            <MenuContents/>
        </Box>

    )
}