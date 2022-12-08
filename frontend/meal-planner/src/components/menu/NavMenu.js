import { Box, Divider, ListItem, Typography } from "@mui/material"
import MenuLink from "./MenuLink"
import MenuContents from "./MenuContents"
import { styled } from "@mui/system"
import SideMenuHeader from "./SideMenuHeader"



export default function NavMenu() {
    return (
        <Box 
            sx={{
                width: '12vw', 
                minWidth:240, 
                display:{xs:'none', md:'flex'}, 
                height:{xs:'auto', md:'100%'}, 
                flexDirection:'column', 
                
                //borderRight: '1px solid #9e9e9e',
                backgroundColor:'#f5f6c9'
            }}
        >
            <SideMenuHeader>
                <MenuLink to='/' style={{textDecoration:'none'}}>
                    <Typography variant='h4'>Meal Manager</Typography>
                </MenuLink>
            </SideMenuHeader>
            <Box sx={{height:'2rem'}}></Box>
            <MenuContents/>
        </Box>

    )
}